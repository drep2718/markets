import { callLLM } from "./llm";
import { NewsItem } from "./fetchNews";

export interface ArticleAnalysis {
  summary: string;
  importance: number;
}

export interface NewsAnalysis {
  marketOverview: string;
  marketSentiment: "bullish" | "bearish" | "neutral" | "mixed";
  sectionSummaries: Record<string, string>;
  articleAnalysis: Record<string, ArticleAnalysis>;
}

const FALLBACK: NewsAnalysis = {
  marketOverview: "",
  marketSentiment: "neutral",
  sectionSummaries: {},
  articleAnalysis: {},
};

const CATEGORY_ALIASES: Record<string, string> = {
  "power and utilities":   "Power & Utilities",
  "power & utilities":     "Power & Utilities",
  "power/utilities":       "Power & Utilities",
  "utilities":             "Power & Utilities",
  "electricity":           "Power & Utilities",
  "policy and regulation": "Policy & Regulation",
  "policy & regulation":   "Policy & Regulation",
  "policy/regulation":     "Policy & Regulation",
  "regulation":            "Policy & Regulation",
  "energy markets":        "Energy Markets",
  "energy market":         "Energy Markets",
  "general energy":        "Energy Markets",
  "crude oil":             "Crude Oil",
  "oil":                   "Crude Oil",
  "natural gas":           "Natural Gas",
  "gas":                   "Natural Gas",
  "renewables":            "Renewables",
  "renewable energy":      "Renewables",
  "renewable":             "Renewables",
};

function normalizeKey(key: string): string {
  return CATEGORY_ALIASES[key.toLowerCase()] ?? key;
}

function normalizeSectionSummaries(raw: Record<string, string>): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [k, v] of Object.entries(raw)) {
    result[normalizeKey(k)] = v;
  }
  return result;
}

interface IndexedArticle {
  index: number;
  title: string;
  category: string;
}

function buildPromptAndIndex(newsGroups: Record<string, NewsItem[]>): {
  prompt: string;
  indexMap: IndexedArticle[];
} {
  const indexMap: IndexedArticle[] = [];
  let counter = 1;

  const categoryNames = Object.keys(newsGroups)
    .filter((cat) => newsGroups[cat].length > 0)
    .join(", ");

  const sections = Object.entries(newsGroups)
    .filter(([, items]) => items.length > 0)
    .map(([category, items]) => {
      const list = items.slice(0, 4).map((item) => {
        const idx = counter++;
        indexMap.push({ index: idx, title: item.title, category });
        const snippet = item.snippet?.trim().slice(0, 80) || "";
        return `  [${idx}] ${item.title}${snippet ? ` — ${snippet}` : ""}`;
      }).join("\n");
      return `### ${category}\n${list}`;
    })
    .join("\n\n");

  const prompt = `You are a senior energy market analyst. Summarize today's energy news.

Categories: ${categoryNames}

Return ONLY this JSON (no other text):
{
  "marketOverview": "2-3 sentences on the biggest developments today",
  "marketSentiment": "bullish|bearish|neutral|mixed",
  "sectionSummaries": {
    "Crude Oil": "2 sentences",
    "Natural Gas": "2 sentences",
    "Renewables": "2 sentences",
    "Power & Utilities": "2 sentences",
    "Policy & Regulation": "2 sentences",
    "Energy Markets": "2 sentences"
  },
  "articles": {
    "1": {"summary": "1 sentence", "importance": 7},
    "2": {"summary": "1 sentence", "importance": 5}
  }
}

Use numeric keys (1, 2, 3...) for articles. importance: 1-10.

NEWS:
${sections}`;

  return { prompt, indexMap };
}

export async function analyzeNews(
  newsGroups: Record<string, NewsItem[]>
): Promise<NewsAnalysis> {
  const totalArticles = Object.values(newsGroups).reduce(
    (sum, items) => sum + items.length, 0
  );
  console.log("[analyzeNews] Total articles:", totalArticles);
  if (totalArticles === 0) return FALLBACK;

  const { prompt, indexMap } = buildPromptAndIndex(newsGroups);
  console.log("[analyzeNews] Sending", indexMap.length, "articles to Groq");

  const result = await callLLM({
    messages: [{ role: "user", content: prompt }],
    maxTokens: 1500,
    temperature: 0.1,
    json: true,
  });

  if (!result) {
    console.error("[analyzeNews] LLM returned null");
    return FALLBACK;
  }

  console.log("[analyzeNews] Response length:", result.text.length);

  try {
    const raw = JSON.parse(result.text) as {
      marketOverview: string;
      marketSentiment: string;
      sectionSummaries: Record<string, string>;
      articles: Record<string, { summary: string; importance: number }>;
    };

    const articleAnalysis: Record<string, ArticleAnalysis> = {};
    for (const { index, title } of indexMap) {
      const entry = raw.articles?.[String(index)];
      if (entry) {
        articleAnalysis[title] = { summary: entry.summary, importance: entry.importance };
      }
    }

    console.log("[analyzeNews] OK | sentiment:", raw.marketSentiment, "| articles mapped:", Object.keys(articleAnalysis).length);

    return {
      marketOverview: raw.marketOverview ?? "",
      marketSentiment: (raw.marketSentiment ?? "neutral") as NewsAnalysis["marketSentiment"],
      sectionSummaries: normalizeSectionSummaries(raw.sectionSummaries ?? {}),
      articleAnalysis,
    };
  } catch (err) {
    console.error("[analyzeNews] JSON parse failed:", err, "| raw:", result.text.slice(0, 200));
    return FALLBACK;
  }
}

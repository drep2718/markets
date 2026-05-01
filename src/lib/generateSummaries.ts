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

function formatAge(dateStr: string): string {
  const h = Math.floor((Date.now() - new Date(dateStr).getTime()) / 3600000);
  if (h < 1) return "< 1h ago";
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

function buildPrompt(newsGroups: Record<string, NewsItem[]>, now: Date): string {
  const dateStr = now.toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });
  const timeStr = now.toLocaleTimeString("en-US", {
    hour: "2-digit", minute: "2-digit", timeZoneName: "short",
  });

  const categoryNames = Object.keys(newsGroups)
    .filter((cat) => newsGroups[cat].length > 0)
    .join(", ");

  const sections = Object.entries(newsGroups)
    .filter(([, items]) => items.length > 0)
    .map(([category, items]) => {
      const list = items.slice(0, 12).map((item, i) => {
        const snippet = item.snippet?.trim().slice(0, 220) || "(no snippet)";
        return `  [${i + 1}] (${formatAge(item.pubDate)}) "${item.title}"\n       Snippet: ${snippet}`;
      }).join("\n\n");
      return `### ${category}\n${list}`;
    })
    .join("\n\n");

  return `Today is ${dateStr} at ${timeStr}.

You are a senior energy market analyst summarizing TODAY'S breaking news.

CRITICAL RULES:
- Base EVERY summary solely on the headlines and snippets below. Do NOT invent details.
- Reference specific events, companies, countries, or price moves from the articles.
- The sectionSummaries keys MUST be spelled EXACTLY as shown: ${categoryNames}
- Generate a sectionSummary for EVERY category listed, even if it only has 1-2 articles.

Return this JSON structure:

{
  "marketOverview": "<2-3 sentences on TODAY's biggest energy market developments — reference specific events, prices, companies from the headlines>",
  "marketSentiment": "<bullish | bearish | neutral | mixed>",
  "sectionSummaries": {
    "Crude Oil": "<2-3 sentences on crude oil markets today>",
    "Natural Gas": "<2-3 sentences on natural gas markets today>",
    "Renewables": "<2-3 sentences on renewables today>",
    "Power & Utilities": "<2-3 sentences on power and utilities today>",
    "Policy & Regulation": "<2-3 sentences on energy policy and regulation today>",
    "Energy Markets": "<2-3 sentences on broader energy market themes today>"
  },
  "articleAnalysis": {
    "<exact article title>": {
      "summary": "<1-2 sentences: what happened and why it matters for energy prices>",
      "importance": <1-10>
    }
  }
}

importance: 10=OPEC decision/major supply shock, 7-9=significant disruption or price move, 4-6=notable policy/corp news, 1-3=minor.
Include EVERY article title exactly as written.

TODAY'S NEWS:
${sections}`;
}

export async function analyzeNews(
  newsGroups: Record<string, NewsItem[]>
): Promise<NewsAnalysis> {
  const totalArticles = Object.values(newsGroups).reduce(
    (sum, items) => sum + items.length, 0
  );
  console.log("[analyzeNews] Total articles:", totalArticles, "| Categories:", Object.keys(newsGroups).map(k => `${k}:${newsGroups[k].length}`).join(", "));
  if (totalArticles === 0) {
    console.log("[analyzeNews] No articles — returning fallback");
    return FALLBACK;
  }

  const now = new Date();
  const result = await callLLM({
    messages: [
      {
        role: "system",
        content:
          "You are a senior energy market analyst. Write tight, specific summaries based ONLY on the articles provided. Never invent details. Respond only with valid JSON.",
      },
      { role: "user", content: buildPrompt(newsGroups, now) },
    ],
    maxTokens: 6000,
    temperature: 0.2,
    json: true,
  });

  if (!result) {
    console.error("[analyzeNews] LLM returned null — returning fallback");
    return FALLBACK;
  }

  console.log("[analyzeNews] LLM response length:", result.text.length);

  try {
    const raw = JSON.parse(result.text) as NewsAnalysis;
    console.log("[analyzeNews] Parse OK | sentiment:", raw.marketSentiment, "| article analyses:", Object.keys(raw.articleAnalysis ?? {}).length, "| section summaries:", Object.keys(raw.sectionSummaries ?? {}).join(", "));
    raw.sectionSummaries = normalizeSectionSummaries(raw.sectionSummaries ?? {});
    return raw;
  } catch (err) {
    console.error("[analyzeNews] JSON parse failed:", err, "| raw text:", result.text.slice(0, 300));
    return FALLBACK;
  }
}

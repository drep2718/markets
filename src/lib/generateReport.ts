import { callLLM } from "./llm";
import { NewsItem } from "./fetchNews";

export interface ReportSection {
  title: string;
  content: string;
}

export interface DailyReport {
  date: string;
  headline: string;
  executiveSummary: string;
  overallSentiment: "bullish" | "bearish" | "neutral" | "mixed";
  sections: ReportSection[];
  keyRisks: string[];
  watchlist: string[];
}

function buildReportPrompt(news: NewsItem[], now: Date): string {
  const dateStr = now.toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  const byCategory: Record<string, NewsItem[]> = {};
  for (const item of news) {
    if (!byCategory[item.category]) byCategory[item.category] = [];
    byCategory[item.category].push(item);
  }

  const newsBlock = Object.entries(byCategory)
    .map(([cat, items]) => {
      const lines = items.slice(0, 10).map((item) => {
        const h = Math.round((Date.now() - new Date(item.pubDate).getTime()) / 3600000);
        return (
          `  - [${h}h ago] "${item.title}"` +
          (item.snippet ? `\n    ${item.snippet.slice(0, 200)}` : "")
        );
      }).join("\n");
      return `## ${cat}\n${lines}`;
    })
    .join("\n\n");

  return `Today is ${dateStr}.

You are a senior energy market analyst writing a comprehensive daily intelligence report for professional traders and investors.

RULES:
- Base the report ENTIRELY on the headlines and snippets provided below.
- Do NOT pad with general background knowledge — only write about what is in today's news.
- Each section covers: (1) what happened today, (2) connection to prior trends implied by the articles, (3) near-term price implications.
- Be specific: name companies, countries, prices, and events from the articles.
- Write in tight professional financial journalism style.

Return this JSON:
{
  "date": "${dateStr}",
  "headline": "<punchy front-page headline for today's energy markets>",
  "executiveSummary": "<3-4 sentences: the most important things that happened today and the net market impact>",
  "overallSentiment": "<bullish | bearish | neutral | mixed>",
  "sections": [
    {
      "title": "Crude Oil",
      "content": "<4-6 paragraphs separated by \\n\\n — key price moves, drivers, context, near-term outlook>"
    },
    {
      "title": "Natural Gas",
      "content": "<4-6 paragraphs>"
    },
    {
      "title": "Renewables & Clean Energy",
      "content": "<3-4 paragraphs>"
    },
    {
      "title": "Power & Utilities",
      "content": "<3-4 paragraphs>"
    },
    {
      "title": "Policy & Regulation",
      "content": "<3-4 paragraphs>"
    },
    {
      "title": "Cross-Market Dynamics",
      "content": "<3-4 paragraphs on how today's events in one market ripple into others>"
    }
  ],
  "keyRisks": [
    "<specific risk 1 based on today's news>",
    "<specific risk 2>",
    "<specific risk 3>",
    "<specific risk 4>",
    "<specific risk 5>"
  ],
  "watchlist": [
    "<thing to watch in next 24-72h>",
    "<thing to watch 2>",
    "<thing to watch 3>",
    "<thing to watch 4>"
  ]
}

TODAY'S NEWS:
${newsBlock}`;
}

export async function generateDailyReport(
  news: NewsItem[]
): Promise<DailyReport | null> {
  if (news.length === 0) return null;

  const now = new Date();
  const result = await callLLM({
    messages: [
      {
        role: "system",
        content:
          "You are a senior energy market analyst writing a daily intelligence briefing. Write tight, specific analysis based ONLY on the articles provided. Respond only with valid JSON.",
      },
      { role: "user", content: buildReportPrompt(news, now) },
    ],
    maxTokens: 8000,
    temperature: 0.25,
    json: true,
  });

  if (!result) return null;

  try {
    return JSON.parse(result.text) as DailyReport;
  } catch {
    return null;
  }
}

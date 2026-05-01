import { NewsItem } from "./fetchNews";
import { ArticleAnalysis } from "./generateSummaries";

const HIGH_IMPORTANCE_KEYWORDS = [
  "opec", "cut", "production cut", "quota", "sanction", "record",
  "crisis", "surge", "crash", "plunge", "spike", "war", "attack",
  "ban", "emergency", "shortage", "outage", "disruption", "explosion",
  "hurricane", "trump", "biden", "fed", "rate", "recession",
  "billion barrel", "million barrel", "strategic reserve",
];

const CREDIBLE_SOURCES = [
  "reuters", "bloomberg", "wsj", "wall street journal", "financial times",
  "ft.com", "eia", "iea", "opec", "oilprice", "s&p global", "platts",
  "energy information", "cnbc", "ap news", "associated press",
];

function hoursAgo(dateStr: string): number {
  const diff = Date.now() - new Date(dateStr).getTime();
  return diff / (1000 * 60 * 60);
}

function baseImportanceScore(item: NewsItem): number {
  const lower = item.title.toLowerCase();
  let score = 5;

  for (const kw of HIGH_IMPORTANCE_KEYWORDS) {
    if (lower.includes(kw)) score += 1.5;
  }

  const srcLower = item.source.toLowerCase();
  for (const src of CREDIBLE_SOURCES) {
    if (srcLower.includes(src)) {
      score += 1;
      break;
    }
  }

  const age = hoursAgo(item.pubDate);
  if (age < 1) score += 2;
  else if (age < 3) score += 1.5;
  else if (age < 6) score += 1;
  else if (age > 24) score -= 1;

  return Math.min(Math.max(score, 1), 10);
}

export function rankArticles(
  items: NewsItem[],
  aiScores: Record<string, ArticleAnalysis>
): NewsItem[] {
  return [...items].sort((a, b) => {
    const aScore = aiScores[a.title]?.importance ?? baseImportanceScore(a);
    const bScore = aiScores[b.title]?.importance ?? baseImportanceScore(b);
    if (bScore !== aScore) return bScore - aScore;
    return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
  });
}

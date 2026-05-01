import RssParser from "rss-parser";

export interface NewsItem {
  title: string;
  link: string;
  source: string;
  pubDate: string;
  snippet: string;
  category: string;
  marketImpact: string;
}

const RSS_FEEDS = [
  // Crude Oil
  {
    url: "https://news.google.com/rss/search?q=crude+oil+price+OR+WTI+OR+brent+oil&hl=en-US&gl=US&ceid=US:en&tbs=qdr:d",
    source: "Google News",
  },
  {
    url: "https://news.google.com/rss/search?q=OPEC+production+OR+oil+supply+OR+oil+demand&hl=en-US&gl=US&ceid=US:en&tbs=qdr:d",
    source: "Google News",
  },
  // Natural Gas
  {
    url: "https://news.google.com/rss/search?q=natural+gas+price+OR+henry+hub+OR+LNG+market&hl=en-US&gl=US&ceid=US:en&tbs=qdr:d",
    source: "Google News",
  },
  {
    url: "https://news.google.com/rss/search?q=LNG+export+OR+gas+storage+OR+gas+pipeline&hl=en-US&gl=US&ceid=US:en&tbs=qdr:d",
    source: "Google News",
  },
  // Renewables
  {
    url: "https://news.google.com/rss/search?q=solar+energy+market+OR+wind+energy+market+OR+renewable+energy+stocks&hl=en-US&gl=US&ceid=US:en&tbs=qdr:d",
    source: "Google News",
  },
  {
    url: "https://news.google.com/rss/search?q=electric+vehicle+battery+OR+hydrogen+energy+OR+clean+energy+investment&hl=en-US&gl=US&ceid=US:en&tbs=qdr:d",
    source: "Google News",
  },
  // Power & Utilities
  {
    url: "https://news.google.com/rss/search?q=electricity+market+OR+power+grid+OR+utility+stocks&hl=en-US&gl=US&ceid=US:en&tbs=qdr:d",
    source: "Google News",
  },
  {
    url: "https://news.google.com/rss/search?q=nuclear+power+plant+OR+coal+power+OR+electricity+prices&hl=en-US&gl=US&ceid=US:en&tbs=qdr:d",
    source: "Google News",
  },
  // Policy & Regulation
  {
    url: "https://news.google.com/rss/search?q=oil+sanctions+OR+energy+policy+OR+energy+tariff&hl=en-US&gl=US&ceid=US:en&tbs=qdr:d",
    source: "Google News",
  },
  {
    url: "https://news.google.com/rss/search?q=energy+regulation+OR+pipeline+regulation+OR+carbon+tax+energy&hl=en-US&gl=US&ceid=US:en&tbs=qdr:d",
    source: "Google News",
  },
  // General Energy Markets
  {
    url: "https://news.google.com/rss/search?q=energy+market+outlook+OR+oil+gas+stocks+OR+energy+sector&hl=en-US&gl=US&ceid=US:en&tbs=qdr:d",
    source: "Google News",
  },
];

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  "Crude Oil": [
    "crude", "oil", "wti", "brent", "barrel", "opec", "petroleum",
    "refinery", "drilling", "shale", "offshore", "oil price",
  ],
  "Natural Gas": [
    "natural gas", "lng", "henry hub", "gas storage", "gas pipeline",
    "liquefied", "methane", "gas price",
  ],
  "Renewables": [
    "solar", "wind", "renewable", "clean energy", "green energy",
    "ev", "electric vehicle", "battery", "hydrogen", "offshore wind",
  ],
  "Power & Utilities": [
    "electricity", "utility", "utilities", "power grid", "grid",
    "nuclear", "coal", "power plant", "electricity price", "kilowatt",
  ],
  "Policy & Regulation": [
    "sanction", "regulation", "policy", "legislation", "tariff",
    "embargo", "subsidy", "carbon tax", "epa", "executive order",
    "congress", "senate", "white house energy",
  ],
};

function categorize(title: string): string {
  const lower = title.toLowerCase();
  let bestCategory = "Energy Markets";
  let bestScore = 0;

  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    let score = 0;
    for (const kw of keywords) {
      if (lower.includes(kw)) score++;
    }
    if (score > bestScore) {
      bestScore = score;
      bestCategory = category;
    }
  }
  return bestCategory;
}

const BULLISH_WORDS = [
  "surge", "rally", "jump", "rise", "gain", "soar", "spike",
  "climb", "boost", "record high", "demand", "shortage", "cut",
  "reduce production", "bullish",
];
const BEARISH_WORDS = [
  "fall", "drop", "decline", "plunge", "tumble", "crash", "slide",
  "slump", "oversupply", "surplus", "weak demand", "bearish",
  "glut", "record low",
];

function assessImpact(title: string, category: string): string {
  const lower = title.toLowerCase();
  let bull = 0;
  let bear = 0;
  for (const w of BULLISH_WORDS) if (lower.includes(w)) bull++;
  for (const w of BEARISH_WORDS) if (lower.includes(w)) bear++;
  if (bull > bear) return `Bullish for ${category}`;
  if (bear > bull) return `Bearish for ${category}`;
  return `Monitor: ${category}`;
}

function extractSource(title: string): { cleanTitle: string; source: string } {
  const match = title.match(/^(.*)\s*-\s*([^-]+)$/);
  if (match) {
    return { cleanTitle: match[1].trim(), source: match[2].trim() };
  }
  return { cleanTitle: title, source: "News" };
}

function isRecent(dateStr: string, maxHours = 48): boolean {
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return true;
  return (Date.now() - d.getTime()) / 3600000 <= maxHours;
}

export async function fetchAllNews(): Promise<NewsItem[]> {
  const parser = new RssParser();
  const allItems: NewsItem[] = [];
  const seenTitles = new Set<string>();

  const results = await Promise.allSettled(
    RSS_FEEDS.map(async (feed) => {
      try {
        const parsed = await parser.parseURL(feed.url);
        return parsed.items || [];
      } catch {
        return [];
      }
    })
  );

  for (const result of results) {
    if (result.status !== "fulfilled") continue;
    for (const item of result.value) {
      if (!item.title || seenTitles.has(item.title)) continue;
      const pubDate = item.pubDate || new Date().toISOString();
      if (!isRecent(pubDate, 48)) continue;
      seenTitles.add(item.title);

      const { cleanTitle, source } = extractSource(item.title);
      const category = categorize(cleanTitle);
      const marketImpact = assessImpact(cleanTitle, category);
      const snippet =
        item.contentSnippet?.replace(/<[^>]*>/g, "").slice(0, 200) ||
        item.content?.replace(/<[^>]*>/g, "").slice(0, 200) ||
        "";

      allItems.push({
        title: cleanTitle,
        link: item.link || "#",
        source,
        pubDate,
        snippet,
        category,
        marketImpact,
      });
    }
  }

  allItems.sort(
    (a, b) => new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime()
  );

  return allItems;
}

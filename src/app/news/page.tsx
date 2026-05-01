import { fetchAllNews, NewsItem } from "@/lib/fetchNews";
import { analyzeNews } from "@/lib/generateSummaries";
import { rankArticles } from "@/lib/rankNews";
import { getUpcomingEvents } from "@/lib/events";
import NewsHero from "@/components/NewsHero";
import NewsCard from "@/components/NewsCard";
import MarketOverview from "@/components/MarketOverview";
import SectionSummary from "@/components/SectionSummary";
import EventsCalendar from "@/components/EventsCalendar";

export const revalidate = 300; // regenerate at most every 5 minutes

const CATEGORIES = [
  "Crude Oil",
  "Natural Gas",
  "Renewables",
  "Power & Utilities",
  "Policy & Regulation",
  "Energy Markets",
];

export default async function NewsPage() {
  const fetchedAt = new Date();

  let news: NewsItem[] = [];
  try {
    news = await fetchAllNews();
  } catch {
    news = [];
  }

  const grouped: Record<string, NewsItem[]> = {};
  for (const cat of CATEGORIES) {
    grouped[cat] = news.filter((n) => n.category === cat);
  }

  const [analysis, upcomingEvents] = await Promise.all([
    analyzeNews(grouped),
    Promise.resolve(getUpcomingEvents(8)),
  ]);

  const rankedGroups: Record<string, NewsItem[]> = {};
  for (const cat of CATEGORIES) {
    rankedGroups[cat] = rankArticles(grouped[cat] ?? [], analysis.articleAnalysis);
  }

  const heroItems = CATEGORIES
    .flatMap((cat) => rankedGroups[cat] ?? [])
    .sort((a, b) => {
      const aScore = analysis.articleAnalysis[a.title]?.importance ?? 5;
      const bScore = analysis.articleAnalysis[b.title]?.importance ?? 5;
      return bScore - aScore;
    })
    .slice(0, 3);

  const aiSummaryMap = Object.fromEntries(
    Object.entries(analysis.articleAnalysis).map(([title, a]) => [title, a.summary])
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-3xl font-bold">Energy Markets</h1>
          <p className="text-sm text-muted mt-1">
            Latest headlines across oil, gas, renewables, and energy policy
          </p>
        </div>
        <div className="text-xs text-muted text-right">
          <div>{news.length} stories</div>
          <div className="mt-0.5">
            {fetchedAt.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              timeZone: "America/New_York",
              timeZoneName: "short",
            })}
          </div>
        </div>
      </div>

      <EventsCalendar events={upcomingEvents} />

      <MarketOverview
        overview={analysis.marketOverview}
        sentiment={analysis.marketSentiment}
        lastUpdated={fetchedAt}
      />

      {news.length === 0 ? (
        <div className="text-center py-20 text-muted">
          <p className="text-lg">Unable to fetch news at this time.</p>
          <p className="text-sm mt-2">Please check your connection and try again.</p>
        </div>
      ) : (
        <>
          <NewsHero items={heroItems} aiSummaries={aiSummaryMap} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-10">
            {CATEGORIES.map((cat) => {
              const items = rankedGroups[cat];
              if (!items || items.length === 0) return null;
              return (
                <div key={cat}>
                  <h2 className="font-serif text-xl font-bold border-b-2 border-foreground pb-2 mb-0">
                    {cat}
                  </h2>
                  <SectionSummary summary={analysis.sectionSummaries[cat] ?? ""} />
                  {items.slice(0, 10).map((item, i) => (
                    <NewsCard
                      key={i}
                      item={item}
                      rank={i + 1}
                      aiSummary={analysis.articleAnalysis[item.title]?.summary}
                      importance={analysis.articleAnalysis[item.title]?.importance}
                    />
                  ))}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

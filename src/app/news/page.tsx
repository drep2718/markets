import { fetchAllNews, NewsItem } from "@/lib/fetchNews";
import { getUpcomingEvents } from "@/lib/events";
import NewsHero from "@/components/NewsHero";
import NewsCard from "@/components/NewsCard";
import EventsCalendar from "@/components/EventsCalendar";
import { rankArticles } from "@/lib/rankNews";

export const revalidate = 0;

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

  const rankedGroups: Record<string, NewsItem[]> = {};
  for (const cat of CATEGORIES) {
    rankedGroups[cat] = rankArticles(grouped[cat] ?? []);
  }

  const heroItems = CATEGORIES
    .flatMap((cat) => rankedGroups[cat] ?? [])
    .slice(0, 3);

  const upcomingEvents = getUpcomingEvents(8);

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

      {news.length === 0 ? (
        <div className="text-center py-20 text-muted">
          <p className="text-lg">Unable to fetch news at this time.</p>
          <p className="text-sm mt-2">Please check your connection and try again.</p>
        </div>
      ) : (
        <>
          <NewsHero items={heroItems} />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-x-8 gap-y-10">
            {CATEGORIES.map((cat) => {
              const items = rankedGroups[cat];
              if (!items || items.length === 0) return null;
              return (
                <div key={cat}>
                  <h2 className="font-serif text-xl font-bold border-b-2 border-foreground pb-2 mb-0">
                    {cat}
                  </h2>
                  {items.slice(0, 10).map((item, i) => (
                    <NewsCard key={i} item={item} rank={i + 1} />
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

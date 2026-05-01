import { NewsItem } from "@/lib/fetchNews";

function timeAgo(dateStr: string): string {
  const now = new Date();
  const then = new Date(dateStr);
  const diff = Math.floor((now.getTime() - then.getTime()) / 1000);
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

interface Props {
  items: NewsItem[];
  aiSummaries?: Record<string, string>;
}

export default function NewsHero({ items, aiSummaries = {} }: Props) {
  if (items.length === 0) return null;
  const lead = items[0];
  const secondary = items.slice(1, 3);

  return (
    <section className="border-b border-border pb-8 mb-8">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-4">
        Top Stories
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
        <div className="lg:col-span-3">
          <a
            href={lead.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group block"
          >
            <span className="text-xs font-medium uppercase tracking-wider text-muted">
              {lead.category}
            </span>
            <h2 className="font-serif text-3xl lg:text-4xl font-bold leading-tight mt-2 mb-3 group-hover:underline decoration-1 underline-offset-4">
              {lead.title}
            </h2>
            {(aiSummaries[lead.title] || lead.snippet) && (
              <p className="text-base text-muted leading-relaxed mb-3 max-w-xl">
                {aiSummaries[lead.title] || lead.snippet}
              </p>
            )}
            <div className="flex items-center gap-3 text-xs text-muted flex-wrap">
              <span className="font-medium text-foreground">{lead.source}</span>
              <span>|</span>
              <span>{timeAgo(lead.pubDate)}</span>
              <span>|</span>
              <span
                className={`font-medium ${
                  lead.marketImpact.startsWith("Bullish")
                    ? "text-green-700"
                    : lead.marketImpact.startsWith("Bearish")
                    ? "text-red-700"
                    : "text-muted"
                }`}
              >
                {lead.marketImpact}
              </span>
            </div>
          </a>
        </div>

        <div className="lg:col-span-2 flex flex-col gap-6 lg:border-l lg:border-border lg:pl-8">
          {secondary.map((item, i) => (
            <a
              key={i}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <span className="text-xs font-medium uppercase tracking-wider text-muted">
                {item.category}
              </span>
              <h3 className="font-serif text-xl font-semibold leading-snug mt-1 mb-2 group-hover:underline decoration-1 underline-offset-4">
                {item.title}
              </h3>
              {(aiSummaries[item.title] || item.snippet) && (
                <p className="text-sm text-muted leading-relaxed mb-2 line-clamp-2">
                  {aiSummaries[item.title] || item.snippet}
                </p>
              )}
              <div className="flex items-center gap-3 text-xs text-muted flex-wrap">
                <span className="font-medium text-foreground">{item.source}</span>
                <span>|</span>
                <span>{timeAgo(item.pubDate)}</span>
                <span>|</span>
                <span
                  className={`font-medium ${
                    item.marketImpact.startsWith("Bullish")
                      ? "text-green-700"
                      : item.marketImpact.startsWith("Bearish")
                      ? "text-red-700"
                      : "text-muted"
                  }`}
                >
                  {item.marketImpact}
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

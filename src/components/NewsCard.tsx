import { NewsItem } from "@/lib/fetchNews";

function timeAgo(dateStr: string): string {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (diff < 60) return "Just now";
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

interface Props {
  item: NewsItem;
  aiSummary?: string;
  importance?: number;
  rank?: number;
}

export default function NewsCard({ item, aiSummary, importance, rank }: Props) {
  const impactColor = item.marketImpact.startsWith("Bullish")
    ? "bg-green-50 text-green-800 border-green-200"
    : item.marketImpact.startsWith("Bearish")
    ? "bg-red-50 text-red-800 border-red-200"
    : "bg-gray-50 text-gray-700 border-gray-200";

  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="group block py-4 border-b border-border last:border-b-0"
    >
      <div className="flex items-start gap-3">
        {rank !== undefined && (
          <span className="shrink-0 mt-0.5 text-xs font-medium text-muted w-4 text-right">
            {rank}.
          </span>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-serif text-base font-semibold leading-snug group-hover:underline decoration-1 underline-offset-4">
              {item.title}
            </h3>
            {importance !== undefined && importance >= 7 && (
              <span className="shrink-0 text-xs font-bold uppercase tracking-wider text-foreground/60">
                #{importance}
              </span>
            )}
          </div>
          {aiSummary ? (
            <p className="text-sm text-muted mt-1.5 leading-relaxed line-clamp-2">{aiSummary}</p>
          ) : item.snippet ? (
            <p className="text-sm text-muted mt-1.5 leading-relaxed line-clamp-2">{item.snippet}</p>
          ) : null}
          <div className="flex items-center gap-3 mt-2 text-xs text-muted flex-wrap">
            <span className="font-medium text-foreground">{item.source}</span>
            <span>|</span>
            <span>{timeAgo(item.pubDate)}</span>
            <span className={`font-medium px-1.5 py-0.5 rounded border ${impactColor}`}>
              {item.marketImpact}
            </span>
          </div>
        </div>
      </div>
    </a>
  );
}

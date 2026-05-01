const SENTIMENT_STYLES: Record<string, { label: string; classes: string }> = {
  bullish: { label: "Bullish", classes: "border-green-300 bg-green-50 text-green-900" },
  bearish: { label: "Bearish", classes: "border-red-300 bg-red-50 text-red-900" },
  mixed:   { label: "Mixed",   classes: "border-yellow-300 bg-yellow-50 text-yellow-900" },
  neutral: { label: "Neutral", classes: "border-gray-300 bg-gray-50 text-gray-800" },
};

interface Props {
  overview: string;
  sentiment: string;
  lastUpdated: Date;
}

export default function MarketOverview({ overview, sentiment, lastUpdated }: Props) {
  const style = SENTIMENT_STYLES[sentiment] ?? SENTIMENT_STYLES.neutral;

  const timeStr = lastUpdated.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/New_York",
    timeZoneName: "short",
  });

  return (
    <section className={`border mb-8 p-5 ${style.classes}`}>
      <div className="flex items-start justify-between gap-4 mb-3">
        <div className="flex items-center gap-3">
          <h2 className="font-serif text-lg font-bold uppercase tracking-wide">
            Market Overview
          </h2>
          <span className={`text-xs font-semibold uppercase tracking-wider px-2 py-0.5 border rounded ${style.classes}`}>
            {style.label}
          </span>
        </div>
        <span className="text-xs shrink-0 opacity-70">Updated {timeStr}</span>
      </div>

      {overview ? (
        <p className="text-base leading-relaxed">{overview}</p>
      ) : (
        <p className="text-sm opacity-60 italic">
          AI analysis unavailable — ensure GROQ_API_KEY is set in Vercel environment variables.
        </p>
      )}
    </section>
  );
}

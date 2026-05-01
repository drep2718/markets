import Link from "next/link";
import { fetchAllNews } from "@/lib/fetchNews";
import { generateDailyReport, DailyReport } from "@/lib/generateReport";
import { getProviderStatus } from "@/lib/llm";

export const revalidate = 3600;
export const maxDuration = 300;

const SENTIMENT_STYLES: Record<string, { label: string; classes: string }> = {
  bullish: { label: "Bullish", classes: "bg-green-50 text-green-900 border-green-300" },
  bearish: { label: "Bearish", classes: "bg-red-50 text-red-900 border-red-300" },
  mixed:   { label: "Mixed",   classes: "bg-yellow-50 text-yellow-900 border-yellow-300" },
  neutral: { label: "Neutral", classes: "bg-gray-50 text-gray-800 border-gray-300" },
};

function ReportSection({ title, content }: { title: string; content: string }) {
  return (
    <section className="mb-10">
      <h2 className="font-serif text-2xl font-bold mb-4 border-b-2 border-foreground pb-2">
        {title}
      </h2>
      <div className="article-body space-y-4">
        {content.split(/\n\n+/).filter(Boolean).map((p, i) => (
          <p key={i} className="text-base leading-relaxed">{p}</p>
        ))}
      </div>
    </section>
  );
}

export default async function ReportPage() {
  const news = await fetchAllNews().catch(() => []);
  const report: DailyReport | null = await generateDailyReport(news);

  const now = new Date();
  const dateStr = now.toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });
  const timeStr = now.toLocaleTimeString("en-US", {
    hour: "2-digit", minute: "2-digit", timeZoneName: "short",
  });

  if (!report) {
    const { ollamaModel, ollamaBase, ollamaRemote } = getProviderStatus();
    return (
      <div className="max-w-2xl mx-auto px-4 py-16">
        <nav className="mb-8 text-sm text-muted">
          <Link href="/news" className="hover:text-foreground">&larr; Back to News</Link>
        </nav>
        <h1 className="font-serif text-2xl font-bold mb-6">Report Unavailable</h1>
        <div className="space-y-4 text-sm leading-relaxed border border-border p-6">
          <p>Could not reach Ollama. Make sure it is running:</p>
          <pre className="bg-gray-50 border border-border text-xs p-3 overflow-x-auto">{
            ollamaRemote
              ? `# Ollama should be running on your laptop\n# and your Cloudflare tunnel should be active\n# Tunnel URL configured: ${ollamaBase}`
              : `# Ollama is installed — just start it:\nbrew services start ollama\n\n# Make sure the model is pulled:\nollama pull ${ollamaModel}`
          }</pre>
          <p className="text-xs text-muted pt-2 border-t border-border">
            Model: {ollamaModel} · Base: {ollamaBase}
          </p>
        </div>
      </div>
    );
  }

  const sentimentStyle = SENTIMENT_STYLES[report.overallSentiment] ?? SENTIMENT_STYLES.neutral;

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <nav className="mb-8 text-sm text-muted">
        <Link href="/news" className="hover:text-foreground">&larr; Back to News</Link>
      </nav>

      <header className="mb-10 border-b border-border pb-8">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-muted">
            Daily Intelligence Report
          </span>
          <span className={`text-xs font-semibold px-2 py-0.5 border rounded ${sentimentStyle.classes}`}>
            {sentimentStyle.label}
          </span>
        </div>
        <h1 className="font-serif text-4xl font-bold leading-tight mb-4">
          {report.headline}
        </h1>
        <p className="text-sm text-muted mb-6">
          {dateStr} &middot; Updated {timeStr} &middot; {news.length} sources analyzed
        </p>
        <div className="bg-highlight border-l-4 border-foreground px-5 py-4">
          <p className="text-base leading-relaxed font-medium article-body">
            {report.executiveSummary}
          </p>
        </div>
      </header>

      <nav className="mb-10 border border-border p-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted mb-3">
          In This Report
        </p>
        <ol className="space-y-1">
          {report.sections.map((s, i) => (
            <li key={i} className="text-sm">
              <a href={`#section-${i}`} className="hover:underline text-foreground/80 hover:text-foreground">
                {i + 1}. {s.title}
              </a>
            </li>
          ))}
          <li className="text-sm">
            <a href="#risks" className="hover:underline text-foreground/80 hover:text-foreground">
              {report.sections.length + 1}. Key Risks &amp; Watchlist
            </a>
          </li>
        </ol>
      </nav>

      {report.sections.map((section, i) => (
        <div key={i} id={`section-${i}`}>
          <ReportSection title={section.title} content={section.content} />
        </div>
      ))}

      <section id="risks" className="mb-10">
        <h2 className="font-serif text-2xl font-bold mb-4 border-b-2 border-foreground pb-2">
          Key Risks &amp; Watchlist
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-serif text-lg font-semibold mb-3 text-red-800">Key Risks</h3>
            <ul className="space-y-2">
              {report.keyRisks.map((risk, i) => (
                <li key={i} className="flex gap-2 text-sm leading-relaxed">
                  <span className="text-red-500 shrink-0 font-bold mt-0.5">—</span>
                  <span>{risk}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-serif text-lg font-semibold mb-3">Watch in Next 72 Hours</h3>
            <ul className="space-y-2">
              {report.watchlist.map((item, i) => (
                <li key={i} className="flex gap-2 text-sm leading-relaxed">
                  <span className="text-muted shrink-0 font-bold mt-0.5">{i + 1}.</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <div className="border-t border-border pt-6 text-xs text-muted">
        <p>For informational purposes only. Not investment advice.</p>
        <Link href="/news" className="mt-2 inline-block underline hover:text-foreground">
          Back to News Feed
        </Link>
      </div>
    </div>
  );
}

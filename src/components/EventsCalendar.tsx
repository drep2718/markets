import { MarketEvent, EventCategory } from "@/lib/events";

const CATEGORY_STYLES: Record<EventCategory, { dot: string; badge: string }> = {
  "OPEC+":           { dot: "bg-amber-500",  badge: "bg-amber-50 text-amber-800 border-amber-200" },
  "Federal Reserve": { dot: "bg-blue-600",   badge: "bg-blue-50 text-blue-800 border-blue-200" },
  "EIA Report":      { dot: "bg-slate-600",  badge: "bg-slate-50 text-slate-700 border-slate-200" },
  "API Report":      { dot: "bg-slate-400",  badge: "bg-slate-50 text-slate-600 border-slate-200" },
  "Baker Hughes":    { dot: "bg-stone-400",  badge: "bg-stone-50 text-stone-600 border-stone-200" },
  "Conference":      { dot: "bg-purple-500", badge: "bg-purple-50 text-purple-800 border-purple-200" },
  "Options Expiry":  { dot: "bg-rose-400",   badge: "bg-rose-50 text-rose-700 border-rose-200" },
  "Economic Data":   { dot: "bg-green-500",  badge: "bg-green-50 text-green-800 border-green-200" },
};

function formatEventDate(date: Date): { day: string; month: string; weekday: string } {
  return {
    day: date.toLocaleDateString("en-US", { day: "numeric" }),
    month: date.toLocaleDateString("en-US", { month: "short" }),
    weekday: date.toLocaleDateString("en-US", { weekday: "short" }),
  };
}

function daysUntil(date: Date): string {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const target = new Date(date);
  target.setHours(0, 0, 0, 0);
  const diff = Math.round((target.getTime() - now.getTime()) / 86400000);
  if (diff === 0) return "Today";
  if (diff === 1) return "Tomorrow";
  return `In ${diff}d`;
}

interface Props {
  events: MarketEvent[];
}

export default function EventsCalendar({ events }: Props) {
  if (events.length === 0) return null;

  return (
    <section className="mb-8 border border-border">
      <div className="px-4 py-3 border-b border-border bg-surface flex items-center justify-between">
        <h2 className="font-serif text-base font-bold uppercase tracking-wide">
          Upcoming Market Events
        </h2>
        <span className="text-xs text-muted">Next {events.length} events</span>
      </div>

      <div className="overflow-x-auto">
        <div className="flex min-w-max divide-x divide-border">
          {events.map((event, i) => {
            const { day, month, weekday } = formatEventDate(event.date);
            const style = CATEGORY_STYLES[event.category];
            const countdown = daysUntil(event.date);
            const isToday = countdown === "Today";
            const isTomorrow = countdown === "Tomorrow";
            const isImminentOrHigh =
              event.importance === "high" || isToday || isTomorrow;

            return (
              <div
                key={i}
                className={`px-4 py-3 min-w-[168px] max-w-[200px] flex flex-col gap-1.5 ${
                  isToday ? "bg-amber-50" : ""
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`w-2 h-2 rounded-full shrink-0 ${style.dot}`}
                    />
                    <span className="text-xs font-semibold text-muted uppercase tracking-wide">
                      {event.category}
                    </span>
                  </div>
                  <span
                    className={`text-xs font-bold ${
                      isToday
                        ? "text-amber-700"
                        : isTomorrow
                        ? "text-foreground"
                        : "text-muted"
                    }`}
                  >
                    {countdown}
                  </span>
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="font-serif text-xl font-bold leading-none">
                    {day}
                  </span>
                  <span className="text-sm text-muted">
                    {month} &middot; {weekday}
                  </span>
                </div>

                <p
                  className={`text-xs leading-snug ${
                    isImminentOrHigh
                      ? "font-semibold text-foreground"
                      : "text-foreground/80"
                  }`}
                >
                  {event.title}
                </p>

                {event.time && (
                  <p className="text-xs text-muted">{event.time}</p>
                )}

                <p className="text-xs text-muted leading-snug line-clamp-2">
                  {event.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

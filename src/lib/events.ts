export type EventCategory =
  | "OPEC+"
  | "Federal Reserve"
  | "EIA Report"
  | "API Report"
  | "Baker Hughes"
  | "Conference"
  | "Options Expiry"
  | "Economic Data";

export interface MarketEvent {
  title: string;
  date: Date;
  time?: string;
  category: EventCategory;
  description: string;
  importance: "high" | "medium" | "low";
}

// ── Scheduled non-recurring events ────────────────────────────────────────────
const SCHEDULED_EVENTS: MarketEvent[] = [
  // FOMC meetings 2026
  {
    title: "FOMC Meeting",
    date: new Date("2026-05-06"),
    time: "Decision 2:00 PM ET",
    category: "Federal Reserve",
    description: "Federal Open Market Committee rate decision and statement. Higher rates = stronger dollar = bearish energy.",
    importance: "high",
  },
  {
    title: "FOMC Meeting",
    date: new Date("2026-06-17"),
    time: "Decision 2:00 PM ET",
    category: "Federal Reserve",
    description: "Federal Open Market Committee rate decision and statement.",
    importance: "high",
  },
  {
    title: "FOMC Meeting",
    date: new Date("2026-07-29"),
    time: "Decision 2:00 PM ET",
    category: "Federal Reserve",
    description: "Federal Open Market Committee rate decision and statement.",
    importance: "high",
  },
  {
    title: "FOMC Meeting",
    date: new Date("2026-09-16"),
    time: "Decision 2:00 PM ET",
    category: "Federal Reserve",
    description: "Federal Open Market Committee rate decision and statement.",
    importance: "high",
  },
  // OPEC+ meetings 2026
  {
    title: "OPEC+ Ministerial Meeting",
    date: new Date("2026-06-01"),
    category: "OPEC+",
    description: "OPEC+ ministers set production quotas for the following months. Most market-moving event in oil markets.",
    importance: "high",
  },
  {
    title: "OPEC+ Ministerial Meeting",
    date: new Date("2026-10-05"),
    category: "OPEC+",
    description: "OPEC+ ministers set production quotas. Q4 production policy.",
    importance: "high",
  },
  {
    title: "OPEC+ Ministerial Meeting",
    date: new Date("2026-12-07"),
    category: "OPEC+",
    description: "Year-end OPEC+ ministerial meeting. Sets 2027 production framework.",
    importance: "high",
  },
  // EIA Monthly
  {
    title: "EIA Short-Term Energy Outlook",
    date: new Date("2026-05-12"),
    time: "12:00 PM ET",
    category: "EIA Report",
    description: "Monthly EIA forecast for oil, gas, and electricity prices and production.",
    importance: "medium",
  },
  {
    title: "EIA Short-Term Energy Outlook",
    date: new Date("2026-06-10"),
    time: "12:00 PM ET",
    category: "EIA Report",
    description: "Monthly EIA forecast update.",
    importance: "medium",
  },
  // Major conferences
  {
    title: "Gastech Conference 2026",
    date: new Date("2026-09-15"),
    category: "Conference",
    description: "World's largest gas, LNG, hydrogen and energy conference. Houston, TX. Major deal announcements and outlook guidance.",
    importance: "medium",
  },
  {
    title: "ADIPEC 2026",
    date: new Date("2026-11-02"),
    category: "Conference",
    description: "Abu Dhabi International Petroleum Exhibition and Conference. Key forum for Middle East energy policy and oil deal flow.",
    importance: "medium",
  },
  // Options expiry (3rd Friday of each month, energy options)
  {
    title: "Crude Oil Options Expiry",
    date: new Date("2026-05-15"),
    time: "NYMEX Close",
    category: "Options Expiry",
    description: "WTI crude oil options on futures expire. Pin risk and volatility typically increase into expiry.",
    importance: "low",
  },
  {
    title: "Crude Oil Options Expiry",
    date: new Date("2026-06-19"),
    time: "NYMEX Close",
    category: "Options Expiry",
    description: "WTI crude oil options on futures expire.",
    importance: "low",
  },
  // Economic data
  {
    title: "US Non-Farm Payrolls",
    date: new Date("2026-05-01"),
    time: "8:30 AM ET",
    category: "Economic Data",
    description: "Monthly US jobs report. Strong jobs = stronger economy = higher oil demand expectations.",
    importance: "medium",
  },
  {
    title: "US CPI Inflation",
    date: new Date("2026-05-13"),
    time: "8:30 AM ET",
    category: "Economic Data",
    description: "Consumer Price Index. Energy is a major CPI component. High CPI may increase Fed hawkishness.",
    importance: "medium",
  },
  {
    title: "US Non-Farm Payrolls",
    date: new Date("2026-06-05"),
    time: "8:30 AM ET",
    category: "Economic Data",
    description: "Monthly US jobs report.",
    importance: "medium",
  },
];

// ── Recurring weekly events ────────────────────────────────────────────────────
// Returns the next N occurrences of a given weekday (0=Sun, 1=Mon...5=Fri, 6=Sat)
function nextWeekday(
  weekday: number,
  hour: number,
  minute: number,
  fromDate: Date = new Date()
): Date {
  const d = new Date(fromDate);
  d.setHours(hour, minute, 0, 0);
  const diff = (weekday - d.getDay() + 7) % 7;
  d.setDate(d.getDate() + (diff === 0 && d < fromDate ? 7 : diff));
  return d;
}

function recurringWeeklyEvents(from: Date): MarketEvent[] {
  const events: MarketEvent[] = [];

  // Generate 3 upcoming occurrences of each weekly event
  for (let week = 0; week < 3; week++) {
    const base = new Date(from);
    base.setDate(base.getDate() + week * 7);

    // Tuesday 4:30 PM ET — API Inventory Report
    const tue = nextWeekday(2, 16, 30, base);
    if (tue > from) {
      events.push({
        title: "API Weekly Inventory Report",
        date: tue,
        time: "4:30 PM ET",
        category: "API Report",
        description: "American Petroleum Institute weekly crude, gasoline, and distillate inventory data. Preview of Wednesday's EIA report.",
        importance: "medium",
      });
    }

    // Wednesday 10:30 AM ET — EIA Petroleum Status
    const wed = nextWeekday(3, 10, 30, base);
    if (wed > from) {
      events.push({
        title: "EIA Petroleum Status Report",
        date: wed,
        time: "10:30 AM ET",
        category: "EIA Report",
        description: "Weekly US crude oil, gasoline, and distillate inventories. The most market-moving weekly report in oil markets.",
        importance: "high",
      });
    }

    // Thursday 10:30 AM ET — EIA Natural Gas Storage
    const thu = nextWeekday(4, 10, 30, base);
    if (thu > from) {
      events.push({
        title: "EIA Natural Gas Storage Report",
        date: thu,
        time: "10:30 AM ET",
        category: "EIA Report",
        description: "Weekly US natural gas in underground storage. Primary market-moving report for Henry Hub prices.",
        importance: "high",
      });
    }

    // Friday 1:00 PM ET — Baker Hughes Rig Count
    const fri1 = nextWeekday(5, 13, 0, base);
    if (fri1 > from) {
      events.push({
        title: "Baker Hughes Rig Count",
        date: fri1,
        time: "1:00 PM ET",
        category: "Baker Hughes",
        description: "Weekly count of active US oil and gas drilling rigs. Leading indicator of production growth 6-12 months forward.",
        importance: "low",
      });
    }

    // Friday 3:30 PM ET — CFTC COT
    const fri2 = nextWeekday(5, 15, 30, base);
    if (fri2 > from) {
      events.push({
        title: "CFTC Commitments of Traders",
        date: fri2,
        time: "3:30 PM ET",
        category: "EIA Report",
        description: "Weekly breakdown of futures positioning by managed money and commercials. Tracks speculative crowding in energy markets.",
        importance: "low",
      });
    }
  }

  return events;
}

export function getUpcomingEvents(count = 8): MarketEvent[] {
  const now = new Date();

  const scheduled = SCHEDULED_EVENTS.filter((e) => e.date >= now);
  const recurring = recurringWeeklyEvents(now);

  const all = [...scheduled, ...recurring];

  // Deduplicate: if a scheduled event falls on same date+title as recurring, prefer scheduled
  const seen = new Set<string>();
  const deduped = all.filter((e) => {
    const key = `${e.title}:${e.date.toDateString()}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return deduped
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .slice(0, count);
}

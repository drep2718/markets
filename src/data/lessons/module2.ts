export const module2 = {
  id: "crude-oil",
  title: "Crude Oil Markets",
  description:
    "Deep dive into the world's most important commodity: benchmarks, futures curves, fundamentals, geopolitics, and refining economics.",
  lessons: [
    {
      id: "wti-vs-brent",
      title: "WTI vs Brent: Benchmarks Explained",
      estimatedMinutes: 20,
      content: `
## The Two Prices of Oil

When someone says "the price of oil," they could mean one of two things: WTI or Brent. Understanding the difference matters because the spread between them tells a story about market structure.

### WTI (West Texas Intermediate)

- **Grade:** Light (API gravity ~39.6) and sweet (sulfur content ~0.24%)
- **Delivery point:** Cushing, Oklahoma — a landlocked pipeline hub with about 90 million barrels of storage capacity
- **Exchange:** NYMEX (CME Group)
- **Contract size:** 1,000 barrels
- **Primary users:** U.S. refiners and traders

WTI was historically the dominant global benchmark, but its landlocked delivery point became a liability during the shale boom. When U.S. production surged, Cushing storage filled up, and WTI temporarily disconnected from global prices. The lifting of the U.S. crude export ban in 2015 helped reconnect WTI to global markets.

### Brent Crude

- **Grade:** Light (API gravity ~38) and sweet (sulfur content ~0.37%)
- **Delivery:** Originally Brent field crude, now a basket of five North Sea crude streams (BFOET: Brent, Forties, Oseberg, Ekofisk, Troll)
- **Exchange:** ICE (Intercontinental Exchange)
- **Contract size:** 1,000 barrels
- **Primary users:** International traders, Asian and European refiners

Brent is the benchmark for roughly 65-70% of global crude oil trade. Because it is a seaborne crude, its price better reflects global supply-demand conditions.

### The Brent-WTI Spread

The spread between Brent and WTI typically ranges from $2 to $8, with Brent usually trading at a premium. This spread reflects:

- **Transportation costs** from Cushing to the Gulf Coast for export
- **Relative supply conditions** in the U.S. vs. globally
- **Pipeline capacity** and midstream bottlenecks
- **Quality differences** between the two grades

When the spread widens significantly (Brent much higher than WTI), it often signals U.S. oversupply or transportation bottlenecks. When it narrows, it may signal tight U.S. markets or ample global supply.

Traders actively trade this spread as a standalone position, and refiners use it to optimize crude sourcing decisions.

## Key Takeaway

WTI is the U.S. benchmark, Brent is the global benchmark. The spread between them is a tradeable indicator of regional supply-demand dynamics and transportation economics.
`,
    },
    {
      id: "futures-curve",
      title: "Oil Futures and the Futures Curve",
      estimatedMinutes: 25,
      content: `
## Reading the Futures Curve

The futures curve (also called the forward curve) is a plot of futures prices across different contract months. It is one of the most important tools in energy trading because its shape tells you about market expectations and physical supply conditions.

### Backwardation

When near-month contracts trade at a higher price than far-month contracts, the market is in **backwardation**. The curve slopes downward.

**What it signals:**
- Current supply is tight relative to demand
- The market is willing to pay a premium for immediate delivery
- Physical inventories are being drawn down
- Generally a bullish indicator for prices

**Why it happens:** When inventories are low, consumers need oil now and are willing to pay more for prompt delivery. Producers may be at capacity and cannot easily increase supply.

### Contango

When far-month contracts trade at a higher price than near-month contracts, the market is in **contango**. The curve slopes upward.

**What it signals:**
- Current supply exceeds demand
- Storage is being filled
- The market expects future prices to be higher (or storage costs dominate)
- Generally a bearish indicator for current prices

**Why it happens:** When supply is ample, there is no urgency to buy now. The contango must be at least large enough to cover the cost of carry (storage, financing, insurance) for the "cash and carry" arbitrage to work — buying oil now, storing it, and selling the future at a higher price.

### The Super Contango

In extreme oversupply situations (like April 2020 during COVID demand collapse), the contango can become so steep that traders fill every available storage facility, including chartering tankers just to store oil at sea. The WTI May 2020 contract briefly traded negative ($-37.63/barrel) because traders with expiring contracts could not find storage at Cushing and had to pay people to take delivery.

### Calendar Spreads

The difference between two contract months is called a **calendar spread** (or time spread). For example, the Dec-2025 vs. Dec-2026 spread. Calendar spreads are one of the most actively traded structures in energy markets because they directly reflect expectations about future supply-demand balances.

**How to use the curve:**
- A deeply backwardated curve supports the thesis that the market is undersupplied
- A contango curve suggests the market is well-supplied or oversupplied
- Changes in the curve shape over time (flattening or steepening) are leading indicators of shifting fundamentals
- Refiners and producers hedge using specific points on the curve, creating natural supply and demand for different contract months

## Key Takeaway

The futures curve is the market's forecast made visible. Backwardation screams "tight market." Contango says "plenty of supply." Watching how the curve evolves over weeks and months gives you an edge that the spot price alone cannot provide.
`,
    },
    {
      id: "supply-demand",
      title: "Supply and Demand Fundamentals",
      estimatedMinutes: 25,
      content: `
## The Fundamental Equation

Global oil supply and demand are each roughly 100 million barrels per day (mb/d). A mismatch of even 1-2 mb/d — just 1-2% of total — can cause dramatic price swings. This is what makes oil such a volatile and tradeable market.

### The Demand Side

**Who uses oil and how much:**
- Transportation: ~55-60% of global oil demand (road, aviation, marine)
- Industry and petrochemicals: ~15-20%
- Residential and commercial: ~10%
- Power generation: ~5%
- Other: ~10%

**Key demand drivers:**
- **GDP growth:** This is the master variable. Every 1% increase in global GDP historically corresponded to roughly 0.5% increase in oil demand. Emerging market GDP growth matters more than developed market growth because their economies are more energy-intensive.
- **China:** The single most important demand growth driver for the past two decades. China's construction, manufacturing, and transportation sectors consume roughly 15-16 mb/d.
- **India:** The next major demand growth story, currently consuming about 5 mb/d with significant growth potential.
- **Seasonal patterns:** U.S. driving season (May-September) boosts gasoline demand. Winter heating season increases demand for heating oil and propane.
- **Jet fuel recovery:** Aviation demand has been a swing factor post-COVID.

### The Supply Side

**Major producing regions and their characteristics:**

**OPEC+ (~40 mb/d combined):**
- Saudi Arabia (~9-10 mb/d, with spare capacity of ~2-3 mb/d)
- Russia (~9-10 mb/d)
- Iraq (~4.5 mb/d)
- UAE (~3.5 mb/d)
- OPEC+ uses quota management to influence prices

**United States (~13 mb/d):**
- World's largest producer since the shale revolution
- Production responds to price with a 6-12 month lag
- Primarily from the Permian Basin (West Texas/New Mexico), Bakken (North Dakota), and Eagle Ford (South Texas)
- Capital discipline since 2020 has slowed growth relative to the 2014-2019 boom era

**Other major producers:**
- Canada (~5 mb/d, mostly oil sands)
- Brazil (~3.5 mb/d, deepwater pre-salt)
- Guyana (rapidly growing, now ~0.6 mb/d)
- Norway, Libya, Angola, Nigeria

### The Balancing Act

The global oil balance is the difference between supply and demand. When supply exceeds demand, inventories build and prices face downward pressure. When demand exceeds supply, inventories draw and prices rise.

**Key balance indicators to watch:**
- OECD commercial inventories (reported monthly by IEA)
- U.S. weekly inventories (EIA report every Wednesday)
- Floating storage (oil stored on tankers, tracked by satellite data)
- OPEC spare capacity (the market's buffer against supply disruptions)

A market with thin spare capacity and low inventories is vulnerable to price spikes. A market with ample spare capacity and high inventories has a ceiling on prices.

## Key Takeaway

Oil is a market where small imbalances create large price moves. Focus on the balance: track demand growth (led by GDP and China), supply decisions (led by OPEC+ and U.S. shale), and the resulting inventory trajectory. That is the fundamental framework.
`,
    },
    {
      id: "geopolitics",
      title: "Geopolitical Risk Factors",
      estimatedMinutes: 20,
      content: `
## Where Politics Meets Barrels

Oil is the most geopolitically sensitive commodity. The concentration of reserves in politically unstable or strategically sensitive regions means that political events frequently move prices.

### Key Geopolitical Chokepoints

**Strait of Hormuz:** The narrow passage between Iran and Oman through which roughly 20% of global oil supply (about 17-20 mb/d) transits daily. Any threat to this strait — Iranian military exercises, seizure of tankers, or armed conflict — immediately adds a risk premium to oil prices.

**Strait of Malacca:** The primary shipping route for oil flowing from the Middle East to East Asia. About 16 mb/d passes through this strait between Malaysia, Singapore, and Indonesia.

**Suez Canal / SUMED Pipeline:** The route connecting the Mediterranean to the Red Sea. Disruptions (like the Ever Given blockage in 2021, or Houthi attacks on Red Sea shipping) force tankers to reroute around the Cape of Good Hope, adding weeks and costs.

**Bab el-Mandeb Strait:** The narrow passage at the southern end of the Red Sea. Houthi rebel attacks on commercial shipping in 2023-2024 disrupted this route significantly.

**Turkish Straits (Bosphorus/Dardanelles):** The route for Russian and Caspian oil exports to the Mediterranean.

### Common Geopolitical Scenarios

**Sanctions:** U.S. and EU sanctions on oil-exporting nations (Iran, Venezuela, Russia) reduce their export capacity and tighten global supply. The effectiveness of sanctions varies — Russian oil found alternative buyers in China and India after 2022 sanctions.

**Conflict and war:** The Russia-Ukraine conflict starting in 2022 caused massive energy price spikes. Gulf Wars, Libyan civil wars, and Nigerian militant attacks on pipelines have all historically disrupted supply.

**OPEC+ politics:** Internal disagreements within OPEC+ (e.g., the Saudi-Russia price war of March 2020) can cause dramatic price collapses when production discipline breaks down.

**Regime change and instability:** Venezuela's production collapsed from 3+ mb/d to under 1 mb/d due to mismanagement and U.S. sanctions. Libya's production swings wildly with civil conflict.

**Elections and policy shifts:** Changes in U.S. administration can affect drilling policy, sanctions enforcement, and strategic reserve management.

### How to Price Geopolitical Risk

The market generally prices geopolitical risk as a premium above fundamental value. Estimating this premium is more art than science, but consider:

- Is the risk to a chokepoint or a producing region?
- How many barrels are at risk?
- Is there spare capacity elsewhere to offset a disruption?
- How quickly could the disruption be resolved?
- Is the market already tight or loose?

A disruption that threatens 2 mb/d in an already tight market (low inventories, low spare capacity) will spike prices far more than the same disruption in a well-supplied market.

## Key Takeaway

Geopolitical risk is a permanent feature of oil markets. Focus on chokepoints, sanctions, and OPEC+ cohesion. The severity of price impact depends on the size of supply at risk and the market's existing buffer (spare capacity + inventories).
`,
    },
    {
      id: "crack-spreads",
      title: "Refining Margins and Crack Spreads",
      estimatedMinutes: 20,
      content: `
## How Refiners Make Money

Refineries buy crude oil and sell refined products (gasoline, diesel, jet fuel, heating oil). Their profit margin is called the **crack spread** — the difference between the price of refined products and the cost of crude oil.

### What Is a Crack Spread?

The term "crack" refers to the catalytic cracking process used in refineries to break down heavy hydrocarbon molecules into lighter, more valuable products.

**Simple crack spread:** The difference between the price of one refined product and crude oil.
- Gasoline crack = Gasoline price - Crude oil price
- Diesel crack = Diesel price - Crude oil price

**3-2-1 crack spread:** The most commonly referenced refining margin. It assumes a refinery produces 2 barrels of gasoline and 1 barrel of diesel/heating oil from every 3 barrels of crude oil:
- 3-2-1 crack = (2 x Gasoline price + 1 x Heating Oil price) - (3 x Crude Oil price), divided by 3

### What Drives Crack Spreads

**Product demand:** Strong driving season demand lifts gasoline cracks. Cold winters lift heating oil cracks. Aviation recovery lifts jet fuel cracks.

**Refinery capacity:** When refineries go offline for maintenance (turnaround season, typically spring and fall) or due to unplanned outages (hurricanes, fires), product supply tightens and cracks widen.

**Crude oil quality:** Light, sweet crudes produce more high-value products (gasoline, diesel) per barrel. Heavy, sour crudes require more complex refinery processing. The discount of heavy/sour crude to light/sweet crude fluctuates with refinery demand for different grades.

**Inventories:** Low product inventories (gasoline, diesel) widen cracks. High inventories compress them.

**Regulation:** IMO 2020 marine fuel sulfur regulations created a structural shift in demand toward low-sulfur fuels and widened diesel cracks.

### Why Traders Watch Crack Spreads

Crack spreads tell you about downstream demand conditions that the crude oil price alone does not reveal:

- Widening cracks suggest strong product demand and/or tight refining capacity — supportive of crude demand
- Narrowing cracks suggest weak product demand and/or excess refining capacity — negative for crude demand
- Extreme cracks (like those seen in mid-2022 when the 3-2-1 crack exceeded $60/barrel) signal structural tightness that incentivizes maximum refinery runs and crude purchases

**Refinery utilization** is closely tied to crack spreads. When cracks are profitable, refineries run at high utilization (90%+), pulling more crude oil. When cracks are negative, refineries cut runs, reducing crude demand.

### Trading Crack Spreads

Many traders and refiners trade crack spreads directly, going long products and short crude (or vice versa). This is a way to express a view on refining margins without taking directional risk on crude oil prices.

## Key Takeaway

Crack spreads are the link between crude oil markets and the real economy. They tell you whether end-user demand for refined products is strong or weak. Widening cracks are bullish for crude demand; narrowing cracks are bearish.
`,
    },
  ],
};

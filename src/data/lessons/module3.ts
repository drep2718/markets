export const module3 = {
  id: "natural-gas",
  title: "Natural Gas Markets",
  description:
    "Learn how natural gas is priced, traded, and influenced by weather, storage, and the growing global LNG trade.",
  lessons: [
    {
      id: "henry-hub",
      title: "Henry Hub and Global Pricing",
      estimatedMinutes: 20,
      content: `
## The U.S. Natural Gas Benchmark

### Henry Hub

Henry Hub is a natural gas pipeline hub in Erath, Louisiana, where nine interstate and four intrastate pipelines interconnect. It serves as the delivery point for the NYMEX natural gas futures contract (symbol: NG), making it the primary U.S. natural gas benchmark.

**Contract specifications:**
- Each contract represents 10,000 million British thermal units (MMBtu)
- Delivery occurs at the Henry Hub
- Contracts are listed for monthly delivery extending 12+ years into the future
- The front-month contract is the most actively traded

### Why Natural Gas Pricing Is Different From Oil

Unlike oil, which trades at essentially one global price (with regional differentials), natural gas prices vary dramatically by region because gas is much harder and more expensive to transport than oil:

**U.S. Henry Hub:** Historically $2-6/MMBtu (has been as low as $1.50 and as high as $10+)
**European TTF (Title Transfer Facility):** Often 2-4x the Henry Hub price
**Asian JKM (Japan-Korea Marker):** Historically the most expensive, often 3-5x Henry Hub

This regional price disparity exists because natural gas must be either piped (requiring fixed infrastructure) or liquefied and shipped as LNG (expensive process). Unlike oil, you cannot easily reroute gas flows in response to price signals.

### Regional Benchmarks

**TTF (Title Transfer Facility):** The European natural gas benchmark, traded on ICE Endex. Based in the Netherlands, it became the dominant European price reference after the decline of oil-linked long-term contracts. TTF prices spiked above $60/MMBtu equivalent during the 2022 European energy crisis following Russian supply cuts.

**JKM (Japan-Korea Marker):** The Asian LNG spot benchmark, published by Platts. Reflects the marginal cost of LNG delivered to Northeast Asia.

**AECO (Alberta, Canada):** Canadian benchmark, often trades at a discount to Henry Hub due to pipeline constraints.

**Waha Hub (West Texas):** Permian Basin natural gas, frequently trades at a deep discount (sometimes negative) because gas is produced as a byproduct of oil drilling and pipeline capacity out of the Permian is constrained.

### The Convergence Trend

The global LNG trade is gradually connecting these regional markets. As more LNG export terminals come online in the U.S. and elsewhere, price differentials are narrowing (though they remain substantial). U.S. LNG exports create a floor under Henry Hub prices because exporters buy domestic gas to sell internationally.

## Key Takeaway

Natural gas is a regional market that is slowly globalizing through LNG. Henry Hub is the U.S. benchmark, but knowing TTF and JKM prices gives you a complete picture. Regional price spreads reflect transportation constraints and create trading opportunities.
`,
    },
    {
      id: "seasonality-storage",
      title: "Seasonality and Storage Reports",
      estimatedMinutes: 25,
      content: `
## The Seasonal Cycle

Natural gas is the most seasonal of the major energy commodities. Demand swings dramatically with temperature, creating a predictable annual pattern that traders build strategies around.

### The Seasonal Pattern

**Withdrawal Season (November - March):** Heating demand drives gas consumption higher. Utilities and homes burn gas for heat. Inventories are drawn down through the winter. Prices typically peak during this period, especially during cold snaps.

**Injection Season (April - October):** Demand falls as heating needs diminish. Producers and utilities inject gas into underground storage to prepare for the next winter. Prices are typically lower, and the market focuses on whether injections are running above or below the 5-year average pace.

**Shoulder Months (March-April, September-October):** Transition periods where demand is relatively low. These are often the lowest-priced months. However, early heat waves or early cold snaps can disrupt the typical pattern.

**Summer Peak:** Air conditioning demand creates a secondary summer peak in gas consumption (gas-fired power plants produce electricity for cooling). In some years, summer heat can be as impactful as winter cold.

### Underground Storage

Natural gas is stored in three types of underground facilities:

**Depleted reservoirs:** Former natural gas fields that have been repurposed for storage. The most common type, they offer large capacity but slower injection/withdrawal rates.

**Salt caverns:** Created by dissolving salt formations with water. They offer the fastest injection and withdrawal rates, making them valuable for meeting peak demand. Concentrated in the Gulf Coast.

**Aquifers:** Porous rock formations saturated with water, converted to gas storage. Found primarily in the Midwest.

Total U.S. working gas storage capacity is roughly 4.7 trillion cubic feet (Tcf). Inventories typically range from about 1.5 Tcf at the end of winter to about 3.5-4.0 Tcf at the end of injection season.

### The EIA Storage Report

The EIA Natural Gas Weekly Storage Report is released every Thursday at 10:30 AM ET. It reports the change in working gas inventories for the previous week.

**What traders watch:**
- **Actual vs. consensus:** If the report shows a smaller injection (or larger withdrawal) than expected, prices typically rise. Larger-than-expected injections push prices down.
- **Year-over-year comparison:** Is inventory higher or lower than the same week last year?
- **5-year average comparison:** Where are inventories relative to the 5-year average? A deficit to the 5-year average is bullish; a surplus is bearish.
- **End-of-season projections:** Based on the injection/withdrawal pace, where will inventories be at the end of the season? A projected low end-of-October inventory heading into winter is very bullish.

### Weather: The Dominant Short-Term Driver

For natural gas, weather forecasts often matter more than any other factor in the short term:

**Heating Degree Days (HDD):** A measure of how cold it is relative to a 65F baseline. More HDDs = more heating demand = more gas consumed.

**Cooling Degree Days (CDD):** A measure of how hot it is relative to a 65F baseline. More CDDs = more cooling demand = more gas-fired electricity generation.

Traders monitor weather models (GFS and European models) obsessively. A shift in the 6-15 day forecast from mild to cold can spike prices in minutes.

## Key Takeaway

Natural gas trades on a seasonal cycle driven by heating and cooling demand. The weekly storage report and weather forecasts are the two most important short-term catalysts. Track inventories relative to the 5-year average to gauge whether the market is tight or loose.
`,
    },
    {
      id: "lng-trade",
      title: "LNG Trade and Global Flows",
      estimatedMinutes: 20,
      content: `
## The LNG Revolution

Liquefied Natural Gas (LNG) is transforming natural gas from a regional commodity into a global one. Understanding LNG trade flows is essential for anyone following energy markets.

### What Is LNG?

LNG is natural gas that has been cooled to approximately -260F (-162C), at which point it condenses into a liquid occupying about 1/600th of its gaseous volume. This compression makes it economical to ship across oceans in specialized tankers.

**The LNG value chain:**
1. **Liquefaction:** Gas is processed and cooled at an export terminal (liquefaction plant). These facilities cost $10-30 billion and take 4-7 years to build. Major export terminals: Sabine Pass and Cameron LNG (Louisiana), Freeport LNG (Texas), Qatargas, Australian terminals.

2. **Shipping:** LNG is loaded onto specialized double-hulled tankers. A standard LNG carrier holds about 3.5 billion cubic feet of gas equivalent. Voyage times range from a few days (U.S. to Europe) to several weeks (U.S. to Asia).

3. **Regasification:** LNG is unloaded at an import terminal, warmed back to gaseous form, and injected into the local pipeline network. Floating Storage Regasification Units (FSRUs) have become popular because they are cheaper and faster to deploy than land-based terminals.

### Global LNG Trade Flows

**Major exporters (by country):**
- Qatar: The world's largest LNG exporter (~80 million tonnes per year, expanding to 126+ MTPA)
- Australia: Second-largest exporter
- United States: Rapidly growing; became the world's largest LNG exporter in 2023
- Russia: Primarily Yamal LNG in Arctic Siberia
- Other: Malaysia, Indonesia, Nigeria, Trinidad, Algeria

**Major importers:**
- China: The fastest-growing LNG buyer
- Japan: Historically the largest buyer, now declining due to nuclear restarts
- South Korea: Major buyer with limited domestic gas production
- Europe: Dramatically increased LNG imports post-2022 to replace Russian pipeline gas
- India: Growing buyer with price-sensitive demand

### The U.S. LNG Story

The U.S. went from planning to import LNG (building import terminals in the 2000s) to becoming the world's largest exporter — one of the most dramatic shifts in energy history. Key facts:

- U.S. LNG export capacity: approximately 14 Bcf/d as of 2024-2025
- Major facilities: Sabine Pass, Freeport, Cameron, Corpus Christi, Calcasieu Pass
- Additional capacity under construction and in permitting
- U.S. LNG exports create a link between Henry Hub prices and global gas markets
- When global prices are high, more U.S. gas flows to exports, tightening domestic supply and lifting Henry Hub prices

### How LNG Arbitrage Works

LNG traders constantly evaluate the arbitrage between buying gas at Henry Hub (or another source), liquefying it, shipping it, and selling at TTF (Europe) or JKM (Asia). The profitability of this arbitrage depends on:

- The price spread between source and destination
- Liquefaction costs (~$2-3/MMBtu)
- Shipping costs (varies with tanker rates and distance)
- Regasification costs (~$0.50-1/MMBtu)

When the spread is wide enough to cover these costs, U.S. LNG exports ramp up. When the spread narrows, cargoes may be diverted or canceled.

## Key Takeaway

LNG is turning natural gas into a global commodity. U.S. LNG exports link Henry Hub to world prices. The LNG arbitrage spread between Henry Hub and TTF/JKM is a key indicator of global gas market tightness and trade flow direction.
`,
    },
    {
      id: "weather-impact",
      title: "Weather's Impact on Natural Gas",
      estimatedMinutes: 15,
      content: `
## The Weather-Driven Market

No commodity is more sensitive to weather than natural gas. Temperature drives roughly 40-50% of U.S. gas demand (through heating and cooling), making weather forecasts the single most important short-term price catalyst.

### How Temperature Moves Prices

**Winter cold:**
- Residential and commercial heating is the largest seasonal demand driver
- A polar vortex event or extended cold snap can spike demand by 10-20 Bcf/d above normal
- Example: Winter Storm Uri (February 2021) caused rolling blackouts in Texas and sent spot gas prices above $200/MMBtu at some hubs (vs. a normal price of $3-4)
- Cold winters draw down storage, creating price support into spring

**Summer heat:**
- Gas-fired power plants ramp up to meet air conditioning electricity demand
- Extreme heat events are increasingly important for gas demand
- The combination of high cooling demand and low wind/solar output can cause gas demand spikes

**Mild weather:**
- Mild winters are bearish — less heating demand, slower storage draws, higher end-of-winter inventories
- Mild summers reduce cooling demand and the associated gas burn for power generation

### Weather Forecasting in Energy Trading

Professional energy traders use sophisticated weather analysis:

**Key models:**
- GFS (Global Forecast System): The primary American weather model, run by NOAA
- ECMWF (European Centre for Medium-Range Weather Forecasts): Often considered more accurate for medium-range forecasts
- Traders compare the two models and track forecast revisions

**Forecast horizons:**
- Days 1-5: High confidence, prices already largely reflect this outlook
- Days 6-10: Moderate confidence, this is where forecast changes move prices most
- Days 11-15: Lower confidence, but shifts here can drive speculative positioning
- Beyond 15 days: Unreliable for specific temperature forecasts, but seasonal outlooks matter for longer-dated contracts

**Temperature departure from normal:** What matters for gas prices is not the absolute temperature, but how it deviates from seasonal norms. A 20F day in January in Chicago is normal and priced in. A 20F day in November is abnormal and would cause prices to spike.

### Regional Weather Matters

Not all cold or heat is equal for gas markets:

- **Population-weighted HDDs/CDDs** matter more than raw temperature readings. Cold in densely populated regions (Northeast, Midwest, Great Lakes) moves the market more than cold in sparsely populated areas.
- The Northeast is particularly gas-sensitive because pipeline capacity into the region is constrained, creating local price spikes during cold snaps (Algonquin Citygate prices have exceeded $30/MMBtu during winter cold snaps vs. $3-4 at Henry Hub).

## Key Takeaway

Weather is the dominant short-term driver of natural gas prices. Watch the 6-15 day forecast window for the biggest price impact. Population-weighted degree days are what matter, not just the thermometer reading. Extreme cold in the Northeast is the highest-impact weather event for U.S. gas markets.
`,
    },
  ],
};

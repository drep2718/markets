export const module5 = {
  id: "trading-energy",
  title: "Trading Energy",
  description:
    "Learn the instruments, strategies, and data sources used to trade energy markets — from futures and options to ETFs and the reports that move prices.",
  lessons: [
    {
      id: "spot-futures-options",
      title: "Spot vs Futures vs Options",
      estimatedMinutes: 25,
      content: `
## The Instruments of Energy Trading

Energy can be traded through several instrument types, each with different risk profiles, capital requirements, and use cases.

### Spot (Cash) Market

The spot market is for immediate delivery of physical commodities. Spot prices reflect current supply-demand conditions at a specific location:

- **Crude oil spot:** Physical barrels traded for delivery within days. Spot prices at different locations (Cushing, Gulf Coast, Rotterdam) reflect local conditions.
- **Natural gas spot:** Gas traded for next-day delivery at specific pipeline hubs. Spot prices can be extremely volatile, especially during weather events.
- **Electricity spot:** Real-time prices set by ISOs every 5 minutes. The most volatile of all, with prices occasionally going negative or spiking above $1,000/MWh.

Most retail traders do not trade the spot market. It requires physical infrastructure, credit relationships, and logistical capability.

### Futures

Futures contracts are standardized agreements to buy or sell a specific quantity of a commodity at a predetermined price on a future date. They are the primary tool for both hedging and speculation in energy markets.

**Key characteristics:**
- **Standardized:** Each contract specifies quantity, quality, delivery point, and delivery date
- **Margined:** You do not pay the full value upfront. Instead, you post margin (typically 5-15% of contract value). This creates leverage.
- **Marked to market daily:** Gains and losses are settled every day
- **Can be closed before delivery:** Most futures positions are closed (offset) before the delivery month. Less than 3% of futures contracts result in physical delivery.

**Example — WTI crude oil futures (CL):**
- Contract size: 1,000 barrels
- At $80/barrel, one contract controls $80,000 of oil
- Initial margin requirement: approximately $6,000-8,000
- Each $1 move in oil = $1,000 gain or loss per contract

**The leverage factor:** This leverage is both the attraction and the danger of futures trading. A 5% move in oil ($4 on an $80 barrel) means a $4,000 gain or loss per contract on perhaps $7,000 of margin — roughly a 57% return or loss on capital. This is why risk management is paramount.

### Options on Futures

Options give the buyer the right (but not the obligation) to buy or sell a futures contract at a specific price (the strike price) by a specific date (the expiration date).

**Call options:** The right to buy. Traders buy calls when they expect prices to rise.
**Put options:** The right to sell. Traders buy puts when they expect prices to fall or want to protect against downside.

**Why options are popular in energy:**
- **Defined risk for buyers:** The most you can lose is the premium paid
- **Volatility trading:** Energy markets are volatile, making options valuable
- **Hedging:** Producers buy puts to protect against price declines. Consumers buy calls to protect against price increases.
- **Strategic flexibility:** Options enable strategies like straddles, strangles, spreads, and collars that are not possible with futures alone

**Key options concepts:**
- **Premium:** The price paid for the option
- **Strike price:** The price at which the option can be exercised
- **Expiration:** When the option expires
- **Implied volatility:** The market's expectation of future price movement, embedded in the option premium. Higher implied volatility = more expensive options.

### Swaps

Swaps are over-the-counter (OTC) agreements between two parties to exchange cash flows based on a commodity price. They are widely used by producers and consumers for hedging:

- A producer might enter a swap to receive a fixed price and pay the floating market price, locking in revenue
- A consumer might do the opposite, paying fixed and receiving floating, locking in costs
- Swaps are typically not available to retail traders but are the dominant hedging tool for commercial participants

## Key Takeaway

Futures are the primary trading vehicle for energy markets, offering liquidity and leverage. Options provide defined risk and strategic flexibility. Understanding the differences between spot, futures, and options — and when to use each — is the foundation of energy trading.
`,
    },
    {
      id: "etfs-equities",
      title: "Energy ETFs and Equities",
      estimatedMinutes: 20,
      content: `
## Trading Energy Through Stocks and Funds

Not everyone trades futures directly. Energy ETFs and equities offer more accessible ways to gain exposure to energy markets, each with distinct characteristics.

### Major Energy ETFs

**Commodity-tracking ETFs:**

**USO (United States Oil Fund):** Tracks WTI crude oil futures. Important caveat: USO does not track the spot price of oil. It holds front-month futures contracts and rolls them monthly. In a contango market, this roll creates a persistent drag on returns (roll yield). USO can significantly underperform the spot price of oil over time due to this effect.

**BNO (United States Brent Oil Fund):** Same structure as USO but tracks Brent crude futures. Same roll yield considerations apply.

**UNG (United States Natural Gas Fund):** Tracks Henry Hub natural gas futures. Natural gas futures are frequently in contango, making UNG a notoriously poor long-term holding. It is primarily used for short-term tactical trades.

**BOIL (ProShares Ultra Bloomberg Natural Gas):** 2x leveraged natural gas exposure. Extremely volatile — for very short-term trades only.

**Understanding roll yield:** When a futures contract approaches expiration, the ETF must sell the expiring contract and buy the next month. If the next month is more expensive (contango), the ETF buys fewer contracts, creating a negative roll yield. Over time, this can destroy value even if the spot price is unchanged. This is the single most important concept for understanding commodity ETFs.

### Energy Equity ETFs

**XLE (Energy Select Sector SPDR):** Tracks the S&P 500 energy sector. Heavily weighted toward ExxonMobil and Chevron. This is the most liquid energy equity ETF and is widely used as a benchmark for the sector.

**XOP (SPDR S&P Oil & Gas Exploration & Production ETF):** Equal-weighted E&P companies. More volatile than XLE because it has greater exposure to smaller, more leveraged producers.

**OIH (VanEck Oil Services ETF):** Tracks oilfield services companies (Schlumberger, Halliburton, Baker Hughes). Oil services stocks are leveraged bets on drilling activity.

**ICLN (iShares Global Clean Energy ETF):** Tracks global clean energy companies. Exposure to solar, wind, and other renewables.

**TAN (Invesco Solar ETF):** Focused on solar energy companies.

### Energy Equities: Key Names

**Integrated majors (upstream + downstream):**
- ExxonMobil (XOM): Largest U.S. energy company
- Chevron (CVX): Second-largest U.S. energy company
- Shell (SHEL): European major
- BP (BP): European major
- TotalEnergies (TTE): French major
- ConocoPhillips (COP): Largest independent E&P

**E&P (exploration and production):**
- EOG Resources (EOG), Pioneer Natural Resources (PXD), Devon Energy (DVN), Diamondback Energy (FANG)
- These are more leveraged to oil prices — they rise faster when oil rises and fall faster when it falls

**Oil services:**
- SLB (formerly Schlumberger), Halliburton (HAL), Baker Hughes (BKR)
- Leveraged to drilling activity, not directly to oil prices

**Midstream (pipelines and storage):**
- Enterprise Products Partners (EPD), Kinder Morgan (KMI), Williams Companies (WMB)
- More stable, income-oriented. Revenue based on volume throughput, not commodity price.

### Stocks vs. Commodities

Important distinctions:
- Energy stocks do not perfectly track oil prices. Company-specific factors (debt, management, reserves, hedging programs) matter.
- Stocks can outperform oil in rising markets (operational leverage) and underperform in falling markets (fixed costs, debt service)
- Dividend income from energy stocks provides a return component that commodity futures do not offer
- Equities have no roll yield drag

## Key Takeaway

Commodity ETFs like USO and UNG suffer from roll yield drag and are poor long-term holdings. Energy equity ETFs (XLE, XOP) provide leveraged exposure to energy prices with the added benefit of dividends. Choose your instrument based on your time horizon and whether you want pure commodity exposure or corporate exposure.
`,
    },
    {
      id: "options-strategies",
      title: "Options Strategies for Energy",
      estimatedMinutes: 25,
      content: `
## Strategic Use of Options in Energy Markets

Energy markets are volatile, and that volatility makes options particularly valuable. Here are the most common options strategies used by energy traders.

### Directional Strategies

**Long call (bullish):** Buy a call option to profit from a price increase with limited downside risk (only the premium). Used when you have a bullish view and want defined risk. Example: Buy a WTI $80 call for $3.00 when oil is at $78. Max loss is $3,000 per contract. Breakeven at $83. Unlimited upside above $83.

**Long put (bearish):** Buy a put option to profit from a price decline. Used when you have a bearish view or want portfolio protection. Example: Buy a WTI $75 put for $2.50 when oil is at $78. Max loss is $2,500. Profitable below $72.50.

**Bull call spread:** Buy a lower-strike call and sell a higher-strike call. Reduces cost but caps upside. Example: Buy $78 call, sell $85 call. Lower premium than a naked call, but maximum profit is capped at $85.

**Bear put spread:** Buy a higher-strike put and sell a lower-strike put. Reduces cost but caps downside protection.

### Volatility Strategies

**Long straddle:** Buy both a call and a put at the same strike price. Profits from a large move in either direction. Used ahead of major events (OPEC meetings, EIA reports, elections) when you expect volatility but are unsure of direction. Cost: the combined premiums. The move must exceed both premiums for the trade to profit.

**Long strangle:** Similar to a straddle but with different strike prices (buy an out-of-the-money call and an out-of-the-money put). Cheaper than a straddle but requires a larger move to profit.

**Calendar spread (time spread):** Buy a longer-dated option and sell a shorter-dated option at the same strike. Profits from time decay of the short option and/or an increase in implied volatility. Used when you expect volatility to increase later.

### Hedging Strategies

**Protective put (for producers):** An oil producer sells physical oil at market prices but buys put options to establish a price floor. If prices fall below the strike, the puts pay off and offset the lower physical revenue. The producer pays the put premium as insurance.

**Costless collar (for producers):** Buy a put (protection) and sell a call (to pay for the put) at a higher strike. This creates a price range: the producer is protected below the put strike but gives up upside above the call strike. The premium received from selling the call offsets the cost of buying the put, making it "costless."

Example: Oil at $80. Buy $70 put, sell $90 call for zero net premium. The producer's revenue is bounded between $70 and $90.

**Call buying (for consumers):** Airlines, utilities, and industrial users buy call options to cap their fuel costs. If prices spike, the calls pay off and offset higher physical costs.

### Key Considerations for Energy Options

**Implied volatility patterns:**
- Energy options tend to have higher implied volatility than equity options
- Implied volatility often increases ahead of OPEC meetings, EIA reports, and seasonal transitions
- There is typically a volatility "smile" where out-of-the-money options have higher implied volatility than at-the-money options

**Seasonality in options:**
- Natural gas options are most expensive heading into winter (peak uncertainty)
- Gasoline options see elevated volatility ahead of driving season
- Options on nearby contracts are more volatile than options on deferred contracts

**Liquidity:**
- Crude oil options are the most liquid energy options market
- Natural gas options are liquid but wider bid-ask spreads
- Refined product options (RBOB gasoline, heating oil) are less liquid

## Key Takeaway

Options are essential tools for energy traders because they allow you to define your risk, express volatility views, and hedge physical positions. The costless collar is the most widely used hedging structure in the energy industry. For speculative traders, the key is choosing the right strike and expiration relative to the expected catalyst.
`,
    },
    {
      id: "reading-reports",
      title: "Reading EIA and API Reports",
      estimatedMinutes: 20,
      content: `
## The Reports That Move Markets

A handful of weekly and monthly reports are the most important data releases in energy markets. Knowing what to look for in each report gives you an edge.

### EIA Weekly Petroleum Status Report

**Released:** Every Wednesday at 10:30 AM ET (delayed by one day after federal holidays)
**Coverage:** U.S. crude oil and refined product supply data for the week ending the previous Friday

**Key data points to watch:**

1. **Crude oil inventories change:** The headline number. A draw (inventory decrease) is bullish; a build (increase) is bearish. The market compares actual vs. consensus estimates — surprises move prices.

2. **Cushing, Oklahoma inventories:** Specifically watched because Cushing is the WTI delivery point. Low Cushing inventories can push WTI into steep backwardation. High Cushing inventories signal local oversupply.

3. **Crude oil production:** U.S. weekly production estimate. Sustained increases indicate growing supply. The market watches for new production records.

4. **Crude oil imports and exports:** Net imports = imports minus exports. Rising exports are bullish for WTI relative to global benchmarks.

5. **Refinery utilization rate:** Measured as a percentage of operable capacity. High utilization (90%+) means refineries are running hard, pulling crude. Low utilization (below 85%) during non-maintenance periods signals weak demand.

6. **Gasoline inventories:** Watches during driving season (May-September). Draws indicate strong consumer demand.

7. **Distillate (diesel/heating oil) inventories:** Particularly important heading into winter. Low distillate stocks heading into cold weather can cause price spikes.

### API Weekly Statistical Bulletin

**Released:** Every Tuesday at 4:30 PM ET
**What it is:** The American Petroleum Institute's own estimate of weekly inventories, published one day before the EIA report.

**How to use it:** The API report serves as a preview of Wednesday's EIA data. However, the two reports use different methodologies (API relies on voluntary company surveys; EIA uses mandatory reporting). Significant deviations between Tuesday's API and Wednesday's EIA can cause volatility.

### EIA Natural Gas Weekly Storage Report

**Released:** Every Thursday at 10:30 AM ET
**Key metric:** The change in working gas in underground storage

Compare the actual number to:
- Consensus estimate
- Year-ago level for the same week
- 5-year average for the same week
- Implied end-of-season inventory (based on current injection/withdrawal pace)

### Monthly Reports

**EIA Short-Term Energy Outlook (STEO):** Released monthly, contains updated supply and demand forecasts for crude oil, natural gas, and other fuels. Changes to production or demand estimates move prices.

**IEA Oil Market Report (OMR):** Released monthly by the International Energy Agency. Focuses on global supply-demand balance. The IEA's demand growth estimate is closely watched — revisions up or down can shift market sentiment.

**OPEC Monthly Oil Market Report (MOMR):** Released monthly, includes OPEC's own demand estimates and production data. Traders compare OPEC's demand forecasts with IEA and EIA figures.

### Baker Hughes Rig Count

**Released:** Every Friday at 1:00 PM ET
**What it is:** The number of active drilling rigs in the U.S. (and internationally)
**Why it matters:** The rig count is a leading indicator of future production. More rigs today means more production 6-12 months from now. The oil-directed rig count is most relevant for crude oil markets.

### CFTC Commitments of Traders (COT) Report

**Released:** Every Friday at 3:30 PM ET (data as of previous Tuesday)
**What it is:** Breakdown of futures and options positioning by trader category: commercials (hedgers), non-commercials (managed money/speculators), and other categories.
**Why it matters:** Extreme speculative positioning can signal a crowded trade. If managed money net long positions are at record highs, the market is vulnerable to a selloff if sentiment shifts. Conversely, record net short positions can set up a short squeeze.

## Key Takeaway

Wednesday at 10:30 AM (EIA petroleum) and Thursday at 10:30 AM (EIA natural gas) are the two most important recurring events in energy markets. Master these reports — know what numbers to watch, compare them to consensus, and understand the implications. The COT report tells you who is positioned where.
`,
    },
    {
      id: "seasonal-patterns",
      title: "Seasonal Patterns and Trading Calendars",
      estimatedMinutes: 15,
      content: `
## The Energy Calendar

Energy markets follow predictable seasonal patterns driven by weather, driving habits, refinery maintenance, and institutional factors. Knowing these patterns provides a structural edge.

### Crude Oil Seasonal Patterns

**Q1 (January-March):** Often weak. Refineries enter turnaround (maintenance) season, reducing crude demand. Post-holiday demand weakness. OPEC meetings in Q1 can set the tone for the year.

**Q2 (April-June):** Typically strengthens. Refineries exit turnaround and ramp up ahead of driving season. Seasonal demand increase for gasoline. Prices often reach a local peak in May-June.

**Q3 (July-September):** Mixed. Driving season demand supports gasoline and crude. Hurricane season (June-November, peak August-October) adds a risk premium for Gulf Coast production and refining. Late Q3 refineries may begin fall turnarounds.

**Q4 (October-December):** Often volatile. Fall refinery turnarounds reduce crude demand. OPEC+ year-end meetings set production policy for the coming year. Heating oil demand begins if winter arrives early. Year-end position squaring by funds.

### Natural Gas Seasonal Patterns

**Spring (March-May):** Typically the lowest-priced period. Heating season ends, injection season begins. Mild weather means low demand. This is often when natural gas reaches its annual low.

**Summer (June-August):** Prices can strengthen if heat waves drive air conditioning demand and gas-fired power generation. Injection pace is closely watched — below-average injections are bullish.

**Fall (September-November):** Prices often begin to rise as the market prices in winter weather risk. End-of-injection-season storage levels are a key focus. Pre-winter positioning by traders.

**Winter (December-February):** Peak volatility and often peak prices. Cold snaps can cause dramatic price spikes. The market watches weekly storage withdrawals and weather forecasts intensely.

### Gasoline and Diesel Seasonal Patterns

**Gasoline:**
- Prices typically rise from February to May as refineries switch to more expensive summer-blend gasoline
- The "summer driving season" (Memorial Day to Labor Day) supports gasoline demand
- Prices often decline in September-October as the switch back to winter-blend gasoline occurs

**Diesel/Heating oil:**
- Demand strengthens in Q4 and Q1 due to heating season and agricultural harvest (trucking demand)
- Hurricane-driven refinery outages can tighten diesel supply in Q3

### Key Events Calendar

**Weekly:**
- Tuesday 4:30 PM ET: API inventory report
- Wednesday 10:30 AM ET: EIA petroleum status report
- Thursday 10:30 AM ET: EIA natural gas storage report
- Friday 1:00 PM ET: Baker Hughes rig count
- Friday 3:30 PM ET: CFTC Commitments of Traders

**Monthly:**
- EIA Short-Term Energy Outlook (varies, typically early month)
- IEA Oil Market Report (mid-month)
- OPEC Monthly Oil Market Report (mid-month)

**OPEC+ meetings:** Scheduled regularly (monthly or quarterly) but can be called at short notice. Always market-moving.

**Quarterly:**
- Refinery turnaround seasons: typically March-May and September-November
- Energy company earnings: typically in late January, April, July, October

**Annual:**
- U.S. driving season: Memorial Day through Labor Day
- Hurricane season: June 1 - November 30 (peak August-October)
- Winter heating season: November - March

## Key Takeaway

Energy markets are seasonal. Knowing the calendar — when refineries shut down, when driving season starts, when storage reports are released, when OPEC meets — lets you anticipate price movements rather than react to them. Build these dates into your trading plan.
`,
    },
  ],
};

export const module4 = {
  id: "power-electricity",
  title: "Power and Electricity Markets",
  description:
    "Understand how electricity markets are structured, how power is priced, and the challenges of integrating renewables into the grid.",
  lessons: [
    {
      id: "electricity-markets",
      title: "How Electricity Markets Work",
      estimatedMinutes: 25,
      content: `
## The Unique Commodity

Electricity is unlike any other commodity. It cannot be economically stored at scale (yet), must be produced and consumed in near-real-time, and travels at the speed of light through a complex grid. These physical constraints create unique market structures.

### Deregulated vs. Regulated Markets

**Regulated markets:** A single utility company owns generation, transmission, and distribution. Prices are set by state public utility commissions based on the utility's cost of service plus an allowed rate of return. Examples: most of the Southeast U.S. (Duke Energy territory, Southern Company territory).

**Deregulated (restructured) markets:** Generation is separated from transmission and distribution. Generators compete to sell power, and prices are set by market forces. A grid operator (ISO/RTO) runs the market. Consumers may choose their electricity supplier. Examples: Texas (ERCOT), most of the Northeast (PJM, NYISO, ISO-NE), California (CAISO), Midwest (MISO, SPP).

### ISOs and RTOs

Independent System Operators (ISOs) and Regional Transmission Organizations (RTOs) operate the wholesale electricity markets in deregulated regions:

**PJM Interconnection:** Covers 13 states plus D.C. The largest wholesale electricity market in the world, serving about 65 million people. Named for Pennsylvania-New Jersey-Maryland.

**ERCOT (Electric Reliability Council of Texas):** The Texas grid operator. Notably, ERCOT is largely isolated from the rest of the U.S. grid, which means Texas cannot easily import power during emergencies (as seen during Winter Storm Uri).

**CAISO (California ISO):** Operates the California grid. Faces unique challenges from high solar penetration and wildfire risk.

**MISO (Midcontinent ISO):** Covers 15 U.S. states and Manitoba, Canada. Large geographic footprint with diverse generation sources.

**ISO-NE (ISO New England):** Operates the New England grid. Faces winter reliability challenges due to natural gas pipeline constraints.

**NYISO (New York ISO):** Operates the New York state grid. New York City is a major demand center with transmission constraints.

**SPP (Southwest Power Pool):** Covers 14 states in the central U.S. High wind power penetration.

### How Wholesale Prices Are Set

In deregulated markets, electricity prices are set through a **merit order dispatch** system:

1. The ISO forecasts demand for each hour of the next day
2. Generators submit offers (bids) specifying how much power they can produce and at what price
3. The ISO stacks these offers from cheapest to most expensive
4. It "dispatches" (turns on) generators in order of cost until supply meets demand
5. The price is set by the last (most expensive) generator needed to meet demand — the **marginal unit**

This means all generators receive the same clearing price, regardless of their individual costs. A nuclear plant that bid $0/MWh receives the same price as the natural gas plant that set the margin at $50/MWh.

**Locational Marginal Pricing (LMP):** Most ISOs use LMP, which sets different prices at different locations on the grid based on local supply, demand, and transmission constraints. High-demand areas with limited transmission may have much higher LMPs than areas with surplus generation.

### Day-Ahead vs. Real-Time Markets

- **Day-ahead market:** Generators and load-serving entities submit bids and offers for each hour of the next day. The ISO clears the market and sets prices. Most electricity is traded here.
- **Real-time market:** Adjusts for actual conditions that differ from day-ahead forecasts. Prices can be much more volatile — spikes of $1,000+/MWh occur during extreme events.

## Key Takeaway

Electricity markets are structured around the physical reality that power must be generated in real-time. The marginal cost of the last generator dispatched sets the price for everyone. Understanding ISOs, merit order dispatch, and LMP is foundational to understanding power markets.
`,
    },
    {
      id: "renewables-economics",
      title: "Renewable Energy Economics",
      estimatedMinutes: 20,
      content: `
## The Cost Revolution

The economics of renewable energy have undergone a dramatic transformation over the past 15 years, fundamentally changing the energy investment landscape.

### The Learning Curve

**Solar photovoltaic (PV):**
- Cost of utility-scale solar has fallen roughly 90% since 2010
- Levelized cost of energy (LCOE) for solar is now $20-50/MWh in most markets, making it the cheapest source of new electricity generation in many regions
- Module costs have plummeted due to manufacturing scale, primarily in China

**Onshore wind:**
- Costs have fallen roughly 70% since 2010
- LCOE of $25-55/MWh in most markets
- Turbine sizes have increased dramatically (from ~2 MW to 5+ MW onshore)

**Offshore wind:**
- More expensive than onshore ($50-100+/MWh) but declining
- Offers higher capacity factors and proximity to coastal demand centers
- Major growth markets: Northern Europe, U.S. East Coast, Asia

**Battery storage:**
- Lithium-ion battery costs have fallen roughly 90% since 2010
- 4-hour battery systems are now cost-competitive with gas peaker plants in many markets
- Batteries are critical for managing renewable intermittency

### LCOE: The Key Metric

Levelized Cost of Energy (LCOE) represents the total lifecycle cost of building and operating a power plant divided by its total energy output. It allows apples-to-apples comparison across technologies:

- Solar PV: $20-50/MWh
- Onshore wind: $25-55/MWh
- Natural gas combined cycle: $45-75/MWh
- Nuclear (new build): $130-200/MWh
- Coal: $65-150/MWh

However, LCOE has limitations — it does not capture the value of dispatchability (ability to generate on demand) or the cost of intermittency (solar only works when the sun shines).

### How Renewables Change Market Dynamics

**Merit order effect:** Because solar and wind have near-zero marginal costs (no fuel costs), they bid into wholesale markets at very low prices and push higher-cost generators (gas, coal) out of the dispatch stack. This depresses wholesale electricity prices during sunny/windy periods.

**Cannibalization effect:** As more solar is built, the value of solar generation decreases because all solar plants produce at the same times (midday), driving midday prices down. This effect is already visible in markets like California and Germany.

**Price volatility:** Renewables increase price volatility. Prices can go negative when there is excess renewable generation and fall to near zero during sunny/windy periods, but spike when renewables are unavailable (evening, calm weather) and gas plants must ramp up.

### Investment and Policy Drivers

**Tax credits and subsidies:**
- U.S. Investment Tax Credit (ITC): 30% tax credit for solar (extended and expanded by the Inflation Reduction Act of 2022)
- U.S. Production Tax Credit (PTC): Per-MWh tax credit for wind
- These credits significantly affect project economics and development timelines

**Renewable Portfolio Standards (RPS):** State-level mandates requiring utilities to source a percentage of electricity from renewables. Create guaranteed demand for renewable generation.

**Corporate procurement:** Major corporations (Google, Amazon, Microsoft) are among the largest buyers of renewable energy through Power Purchase Agreements (PPAs), driven by ESG commitments and increasingly by economics.

## Key Takeaway

Renewable energy is now the cheapest source of new electricity in most markets. But intermittency remains the central challenge. The growing penetration of renewables is reshaping electricity market dynamics, creating both opportunities and new problems that battery storage is beginning to address.
`,
    },
    {
      id: "capacity-markets",
      title: "Capacity Markets and Ancillary Services",
      estimatedMinutes: 20,
      content: `
## Paying for Reliability

Wholesale energy markets pay generators for the electricity they produce. But there is a problem: some generators are needed only during peak demand (a few hundred hours per year). If they only earn revenue during those hours, they may not be profitable enough to stay in service — but the grid needs them to prevent blackouts.

### The Missing Money Problem

This is called the "missing money problem." Energy-only markets may not provide enough revenue to keep reliable but infrequently-used generators (like gas peaker plants) available. Two solutions have emerged:

**1. Capacity markets (used by PJM, ISO-NE, NYISO):** Generators are paid for being available to produce electricity, even if they are not actually generating. The ISO holds capacity auctions years in advance, and generators that clear the auction receive a capacity payment in exchange for a commitment to be available when needed.

- PJM's capacity market (Reliability Pricing Model) holds auctions 3 years ahead
- Capacity prices reflect the cost of maintaining enough generation to meet peak demand plus a reserve margin
- New generation and demand response can compete in these auctions

**2. Energy-only markets (used by ERCOT):** Texas does not have a capacity market. Instead, it allows energy prices to spike to very high levels during scarcity (the price cap is $5,000/MWh). The theory is that these high prices during peak hours provide enough revenue to incentivize generators to stay available. Winter Storm Uri in 2021 tested this model severely.

### Ancillary Services

Beyond energy and capacity, the grid needs several ancillary services to maintain stability:

**Frequency regulation:** The grid operates at 60 Hz (in the U.S.). If supply and demand are not perfectly balanced every second, frequency deviates. Generators that can rapidly adjust output up or down provide frequency regulation service and are compensated for this capability. Batteries are increasingly dominant in this market due to their fast response time.

**Spinning reserves:** Generation capacity that is online, synchronized to the grid, and ready to increase output within minutes if a generator trips offline or demand spikes unexpectedly.

**Non-spinning reserves:** Generation capacity that can be brought online within 10-30 minutes to replace a failed unit.

**Voltage support:** Generators provide reactive power to maintain voltage levels across the transmission system.

**Black start capability:** Some generators can restart without external power, enabling grid restoration after a complete blackout.

### Why This Matters for Energy Markets

Capacity and ancillary service revenues are a significant part of generator economics:

- A gas peaker plant may earn more from capacity payments than from actually selling electricity
- Battery storage projects increasingly earn revenue primarily from ancillary services, not energy arbitrage
- Capacity market design affects which types of generation get built and which retire
- The debate between capacity markets and energy-only markets has significant implications for reliability and prices

## Key Takeaway

The electricity market is actually several markets layered on top of each other: energy, capacity, and ancillary services. Capacity markets pay generators to be available. Ancillary services pay for grid stability. Understanding these revenue streams is essential for evaluating power sector investments and understanding why certain plants stay open or close.
`,
    },
    {
      id: "duck-curve",
      title: "The Duck Curve and Grid Challenges",
      estimatedMinutes: 15,
      content: `
## When the Sun Sets, the Grid Sweats

The "duck curve" is one of the most important concepts in modern electricity markets. It illustrates the challenge of integrating large amounts of solar energy into the grid.

### What Is the Duck Curve?

The duck curve is a graph of net electricity demand (total demand minus solar generation) over the course of a day. Its shape resembles a duck:

1. **Morning ramp (the tail):** As the day begins, demand rises while solar generation is still low
2. **Midday belly:** Solar generation peaks, pushing net demand (and prices) to their lowest point. In California, midday net demand has gone negative on some days.
3. **Evening ramp (the neck):** As the sun sets (typically 4-7 PM), solar generation drops rapidly. But this is exactly when people come home, turn on appliances, and use electricity. Net demand ramps up sharply.
4. **Evening peak (the head):** The highest net demand of the day occurs after sunset, requiring rapid deployment of gas-fired generation.

### Why This Is a Problem

The evening ramp creates several challenges:

**Ramping speed:** Gas-fired power plants must ramp up very quickly (sometimes adding gigawatts of capacity within 2-3 hours) to replace declining solar output while meeting rising demand. Not all generators can ramp this fast.

**Minimum generation levels:** During the midday solar surplus, conventional generators may be forced to their minimum operating levels or shut down entirely. Shutting down and restarting is expensive and technically challenging for some plant types.

**Oversupply risk:** On mild, sunny days, there may be more solar generation than the grid can absorb, leading to curtailment (wasting solar energy by disconnecting panels from the grid) or negative prices.

**Reliability risk:** If the evening ramp is steeper than the available generation can handle, the grid faces potential shortfalls.

### Solutions in Development

**Battery storage:** The primary solution. Batteries charge during the midday solar surplus (when prices are low) and discharge during the evening ramp (when prices are high). California has deployed over 10 GW of battery storage specifically to address the duck curve. The 4-hour battery has become the standard product because it covers the critical sunset-to-evening-peak window.

**Demand response:** Shifting flexible demand (EV charging, industrial processes, water heating) to midday hours when solar is abundant.

**Grid interconnections:** Building transmission lines to move surplus solar electricity to other regions where it is needed.

**Flexible generation:** Developing faster-ramping gas turbines and other dispatchable resources.

**Time-of-use pricing:** Charging consumers more during peak hours and less during solar surplus hours to incentivize load shifting.

### Investment Implications

The duck curve creates clear investment signals:

- Battery storage is a structural growth story driven by the need to shift solar energy from midday to evening
- Gas peaker plants remain necessary for reliability but face increasing competition from batteries
- Midday electricity prices will continue to decline in solar-heavy markets, reducing the value of new solar without paired storage
- Evening peak pricing creates revenue opportunities for dispatchable resources

## Key Takeaway

The duck curve is the defining challenge of the renewable energy transition. Solar depression at midday and the steep evening ramp create grid stress that batteries are increasingly solving. This dynamic drives massive investment in storage and reshapes how electricity markets set prices throughout the day.
`,
    },
  ],
};

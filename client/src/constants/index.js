
export const lineItemTitles = {
  revenues: "Revenues ",
  cogs: "Cost of Goods Sold",
  gp: "Gross Profit ",
  opex: "Operating Expenses ",
  ebitda: "EBITDA ",
  depreciation: "Depreciation ",
  amortization: "Amortization ",
  ebit: "EBIT ",
  taxes: "Taxes ",
  nopat: "NOPAT ",
  nwcChange: "Change in NWC ",
  capex: "CapEx ",
  fcf: "Unlevered Free Cash Flow ",
  discountPeriods: "Periods Discounted ",
  pvFactors: "Present Value Factor ",
  dcf: "Discounted Cash Flows ",
  partialPeriods: "Partial Period Factor",
}

export const forecastSequence = [
  "revenues",
  "cogs",
  "gp",
  "opex",
  "ebitda",
  "depreciation",
  "amortization",
  "ebit",
  "taxes",
  "nopat",
  "depreciation",
  "amortization",
  "capex",
  "nwcChange",
  "fcf",
  "partialPeriods",
  "discountPeriods",
  "pvFactors",
  "dcf"
]

export const forecastInputLineItems = [
  'revenues',
  'cogs',
  'opex',
  'depreciation',
  'amortization',
  'capex',
  'nwcChange'
]

export const template = {
  _id: '',
  userId: '',
  forecasts: {
    revenues: [],
    cogs: [],
    opex: [],
    nwcChange: [],
    depreciation: [],
    amortization: [],
    capex: [],
    gp: [],
    ebitda: [],
    ebit: [],
    taxes: [],
    nopat: [],
    fcf: [],
    dcf: []
  },
  discounting: {
    discountPeriods: [],
    pvFactors: [],
    partialPeriods: []
  },
  BEV: { 
    discretePV: '', 
    consolidated: '' 
  },
  TV: {
    values: {
      terminalCF: '',
      preDiscountTV: '',
      discountedTV: ''
    },
    pvFactor: '',
    terminalFactor: ''
  },
  valAssumps: { 
    wacc: '12', 
    taxRate: '25', 
    ltgr: '3' 
  },
  genInputs: { 
    projectName: '',
    entityName: '',
    periods: 5, 
    valDate: '2019-10-31', 
    fye: '2019-12-31' 
  }
}


// export const APIData = 
// {
//   EBITDA: 74542000000,
//   avg10Volume: 37374972.4,
//   avg30Volume: 51697323.67,
//   beta: 1.1619127447740483,
//   companyName: "Apple, Inc.",
//   currentDebt: 16240000000,
//   day5ChangePercent: 0.055148,
//   day30ChangePercent: 0.169109,
//   day50MovingAvg: 273.21,
//   day200MovingAvg: 256.66,
//   debtToEquity: 1.19,
//   dividendYield: 0.010735600522654236,
//   employees: 137000,
//   enterpriseValue: 1246471671600,
//   enterpriseValueToRevenue: 4.79,
//   exDividendDate: "2020-02-07",
//   float: 4370701976,
//   forwardPERatio: 22.97,
//   grossProfit: 97704000000,
//   marketcap: 1239004671600,
//   maxChangePercent: 279.3663,
//   month1ChangePercent: 0.111299,
//   month3ChangePercent: -0.108659,
//   month6ChangePercent: 0.137001,
//   nextDividendDate: null,
//   nextEarningsDate: "2020-04-30",
//   peHigh: 25.89652448657188,
//   peLow: 13.449447077409163,
//   peRatio: 22.09,
//   pegRatio: 1.15,
//   priceToBook: 13.692474931482629,
//   priceToSales: 4.77,
//   profitMargin: 0.2125492368291482,
//   putCallRatio: 1.00829186436755,
//   revenue: 259968000000,
//   revenuePerEmployee: 1897576.64,
//   revenuePerShare: 59.41,
//   sharesOutstanding: 4375480000,
//   totalCash: 100580000000,
//   totalRevenue: 259968000000,
//   ttmDividendRate: 3.04,
//   ttmEPS: 12.7549,
//   week52change: 0.38395,
//   week52high: 327.85,
//   week52highDate: "2020-01-29",
//   week52low: 170.27,
//   week52lowDate: "2019-06-03",
//   year1ChangePercent: 0.38395,
//   year2ChangePercent: 0.7137,
//   year5ChangePercent: 1.2016,
//   ytdChangePercent: -0.0572,
// }
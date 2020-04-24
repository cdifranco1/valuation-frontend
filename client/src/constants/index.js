
export const lineItemTitles = {
  revenues: "Revenues: ",
  cogs: "Cost of Goods Sold",
  opex: "Operating Expenses: ",
  nwcChange: "Change in NWC: ",
  depreciation: "Depreciation: ",
  amortization: "Amortization: ",
  capex: "CapEx: ",
  gp: "Gross Profit: ",
  taxes: "Taxes: ",
  ebitda: "EBITDA: ",
  ebit: "EBIT: ",
  nopat: "NOPAT: ",
  fcf: "Unlevered Free Cash Flow: ",
  discountPeriods: "Periods Discounted: ",
  pvFactors: "Present Value Factor: ",
  dcf: "Discounted Cash Flows: ",
  partialPeriod: "Partial Period: ",
}


export const template = {
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
  BEV: { 
    discretePV: '', 
    consolidated: '' 
  },
  TV: {
    terminalCF: '',
    preDiscountTV: '',
    discountedTV: '',
    terminalFactor: ''
  },
  valAssumps: { wacc: '', taxRate: '', ltgr: '' },
  genInputs: { periods: 5, valDate: '', fye: '' }
}
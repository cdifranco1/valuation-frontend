const mongoose = require('mongoose')

const DCFSchema = new mongoose.Schema({
  forecasts: {
    revenues: [Number],
    cogs: [Number],
    opex: [Number],
    nwcChange: [Number],
    depreciation: [Number],
    amortization: [Number],
    capex: [Number],
    gp: [Number],
    ebitda: [Number],
    ebit: [Number],
    taxes: [Number],
    nopat: [Number],
    fcf: [Number],
    dcf: [Number]
  },
  discounting: {
    discountPeriods: [Number],
    pvFactors: [Number],
    partialPeriods: [Number]
  },
  BEV: { 
    discretePV: String, 
    consolidated: String 
  },
  TV: {
    values: {
      terminalCF: String,
      preDiscountTV: String,
      discountedTV: String
    },
    pvFactor: String,
    terminalFactor: String
  },
    valAssumps: { 
      wacc: String, 
      taxRate: String, 
      ltgr: String 
    },
    genInputs: { 
      periods: Number, 
      valDate: String, 
      fye: String 
    }
  })

  const DCF = mongoose.model('DCF', DCFSchema)

  exports.DCF = DCF

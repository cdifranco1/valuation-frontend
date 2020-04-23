const moment = require('moment')
const numeral = require('numeral')

const dummyForecasts = {
  forecasts:{
    revenues: [100, 200, 300, 400, 500],
    cogs: [60, 150, 200, 300, 350],
    opex: [50, 50, 50 , 50, 50],
    nwcChange: [20, 35, 40, 45, 50],
    depreciation: [20, 35, 40, 45, 50],
    amortization: [20, 35, 40, 45, 50],
    capex: [10, 10, 10, 10, 10]
  },
  genInputs: {
    periods: 10,
    valDate: '2019-10-01',
    fye: '2019-12-31'
  },
  valAssumps: {
    wacc: '13',
    taxRate: '25',
    ltgr: '3'
  }
}

const nonConvertible = {
  pvFactors: true,
  discountPeriods: true,
  partialPeriod: true
}

const convert = {
  toCents: (arr) => {
    return arr.map(el => el * 100)
  },
  toDollars: (val) => {
    return (
      Array.isArray(val) ?
      val.map(el => el / 100) :
      val / 100
    )
  },
  toDecimal: (val) => {
    return val / 100
  }
}

function prepForecasts(inputs){
  const forecastInputs = {}
  const valInputs = {}

  for (let key in inputs.forecasts){
    forecastInputs[key] = convert.toCents(inputs.forecasts[key])
    while (forecastInputs[key].length < inputs.genInputs.periods){
      forecastInputs[key].push(0)
    }
  }
  
  for (let key in inputs.valAssumps){
    valInputs[key] = convert.toDecimal(inputs.valAssumps[key])
  } 

  return [forecastInputs, valInputs, inputs.genInputs]
}

function processForecasts(inputs){
  const { rss, heapTotal } = process.memoryUsage()
  console.log('rss', numeral(rss).format('0.0 ib'), 
                  'heapTotal', numeral(heapTotal).format('0.0 ib'))
  
  const [forecastInputs, valInputs, genInputs] = prepForecasts(inputs)
  

  const forecastCalcs = calcYear(forecastInputs, valInputs, genInputs.periods)
  
  const discountPeriods = calcDiscountPeriods(genInputs)
  forecastCalcs.discountPeriods = [...discountPeriods]
  
  
  const pvFactors = calcPVFactors(valInputs, genInputs, forecastCalcs)
  forecastCalcs.pvFactors = [...pvFactors]

  const TV = calcTerminalValue(genInputs, valInputs, forecastCalcs)
  forecastCalcs.TV = TV
  
  // const [dcf, bev ] = calcBEV(forecastCalcs, genInputs)
  // forecastCalcs.dcf = dcf
  
  // convert inputs back to dollars
  for (let key in forecastCalcs){
    if (!nonConvertible[key]){
      forecastCalcs[key] = convert.toDollars(forecastCalcs[key])
    }
  }

  // convert forecast calcs back to dollars
  const convertedInputs = {}
  for (let key in forecastInputs){
      convertedInputs[key] = convert.toDollars(forecastInputs[key])
  }

  const forecasts = {
    ...convertedInputs,
    ...forecastCalcs
  }
  
  console.log(forecastCalcs)
  return forecasts
} 


//discount periods - relies on partial period
function calcDiscountPeriods(genInputs){
  const discountPeriods = []
  
  const partialPeriod = calcPartialPeriod(genInputs)
  
  for (let i = 0; i < genInputs.periods; i++){
    if (i === 0){
      discountPeriods.push(partialPeriod / 2)
    } else if (i === 1){
      discountPeriods.push(discountPeriods[0] * 2 + 0.5)
    } else {
      discountPeriods.push(discountPeriods[i - 1] + 1)
    }
  }
  return discountPeriods
}

//partial period calc 
function calcPartialPeriod(genInputs){

  const days = 365.25
  const a = moment(genInputs.fye)
  const b = moment(genInputs.valDate)
  partialPeriod = a.diff(b, 'days') / days
  
  return partialPeriod
}

//present value factors
function calcPVFactors(valInputs, genInputs, forecastCalcs){
    const pvFactors = []

    const discountFactor = 1 + Number(valInputs.wacc)

    for (let i = 0; i < genInputs.periods; i++){
      pvFactors.push(1 / Math.pow(discountFactor, forecastCalcs.discountPeriods[i]))
    }
    
    return pvFactors
  }


function calcTerminalValue(genInputs, valInputs, forecastCalcs){
    const periods = genInputs.periods

    const terminalFactor = (1 / (Number(valInputs.wacc) - Number(valInputs.ltgr)))
    const TV = forecastCalcs.fcf[periods - 1] * (1 + valInputs.ltgr) * terminalFactor
    const discountedTV = TV * forecastCalcs.pvFactors[forecastCalcs.pvFactors.length - 1]
    
    return discountedTV
  }

function calcBEV(forecasts, genInputs){
  const { pvFactors, fcf, TV } = forecasts
  const { periods } = genInputs
  const partialPeriod = calcPartialPeriod(genInputs)

    const dcf = []
    
    for (let i = 0; i < periods; i++){
      let pvCashFlow
      if (i = 0){
        pvCashFlow = fcf[i] * pvFactors[i] * partialPeriod  
      } else {
        pvCashFlow = fcf[i] * pvFactors[i]
      }
      dcf.push(pvCashFlow)
    }

    console.log( 'hello')
    const discretePV = dcf.reduce((a, b) => a + b)
    const BEV = discretePV + TV

    return [dcf, BEV]
  }

function calcYear(forecastInputs, valInputs, periods) {
  const forecastCalcs = {}
  forecastCalcs.gp = []
  forecastCalcs.taxes = []
  forecastCalcs.ebitda = []
  forecastCalcs.ebit = []
  forecastCalcs.nopat = []
  forecastCalcs.fcf = []
  forecastCalcs.pvFactors = []
  forecastCalcs.partialPeriod = []
  forecastCalcs.dcf = []

  for (let i = 0; i < periods; i++){
    forecastCalcs.gp.push(forecastInputs.revenues[i] - forecastInputs.cogs[i])
    // margins.gp.push(forecastCalcs.gp[i] / forecastInputs.revenues[i])

    forecastCalcs.ebitda.push(forecastCalcs.gp[i] - forecastInputs.opex[i])
    // margins.ebitda.push(forecastCalcs.ebitda[i] / forecastInputs.revenues[i])

    forecastCalcs.ebit.push(forecastCalcs.ebitda[i] - forecastInputs.depreciation[i] - forecastInputs.amortization[i])
    // margins.ebit.push(forecastCalcs.ebit[i] / forecastInputs.revenues[i])
    
    forecastCalcs.taxes.push(forecastCalcs.ebit[i] * Number(valInputs.taxRate))
    // forecastCalcs.nopat.push(forecastCalcs.ebit[i] - forecastCalcs.taxes[i])

    const fcf = forecastCalcs.nopat[i] + forecastInputs.depreciation[i] + forecastInputs.amortization[i] - forecastInputs.capex[i] - forecastInputs.nwcChange[i]
    forecastCalcs.fcf.push(fcf)
  }

  return forecastCalcs
}


setInterval(() => {
  console.log(process.memoryUsage())
  const { rss, heapTotal } = process.memoryUsage()
  console.log('rss', numeral(rss).format('0.0 ib'), 
                  'heapTotal', numeral(heapTotal).format('0.0 ib'))
}, 5000)

processForecasts(dummyForecasts)

// module.exports = processForecasts


  

/*
Model Calcs

EBITDA 
  - Depreciation
  - Amortization
EBIT
  - Taxes
NOPAT
  +   D&A
  -   CapEx
  -/+ Increase/Decrease in NWC
Unlevered FCF

PV Factor:
1/((1+WACC)**discountPeriod)

Discount Period:

*/
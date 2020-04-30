const moment = require('moment')

const inputs = {
  forecasts:{
    revenues: [100, 200, 300, 400, 500],
    cogs: [30, 40, 50, 60, 70],
    opex: [50, 50, 50 , 50, 50],
    nwcChange: [20, 35, 40, 45, 50],
    depreciation: [20, 35, 40, 45, 50],
    amortization: [20, 35, 40, 45, 50],
    capex: [10, 10, 10, 10, 10]
  },
  generalInputs: {
    periods: 5,
    valDate: '2019-10-01',
    fye: '2019-12-31'
  },
  valAssumps: {
    wacc: '13',
    taxRate: '25',
    ltgr: '3'
  }
}

function mapObjArrEl(obj, fn){
  const newObj = Object.keys(obj).reduce((a, b) => {
    if (obj[b].length){
      a[b] = obj[b].map(fn)
      return a 
    }

    a[b] = fn(obj[b]) 
    return a 

  }, {})
  return newObj
}

const expand = (arr, pd, expandVal) => {
  const length = arr.length
  const mergeArr = Array.from({length: (pd - length)}, () => expandVal)

  return [...arr, ...mergeArr]
}

const truncate = (arr, pd) => {
  return arr.filter((el, i) => (i < pd))
}

function mapObjArr(obj, fn, ...args){
  const newObj = Object.keys(obj).reduce((a, b) => {
    a[b] = fn(obj[b], ...args)
    return a
  }, {})

  return newObj
}

const createUpdateFunction = (obj) => {
  return (fn, ...args) => {
    return mapObjArr(obj, fn, ...args)
  }
}



//convert to cents before processing
function prepForecasts(inputObj){
  const { forecasts } = inputObj
  const { periods } = inputObj.generalInputs
  
  const updateForecasts = createUpdateFunction(forecasts)
  const expandedForecasts = updateForecasts(expand, periods, 0) 

  //want to make sure all forecasts are the same length, in the case that user expands one forecast and changes back
  const updateExpandedForecasts = createUpdateFunction(expandedForecasts)
  const truncatedForecasts = updateExpandedForecasts(truncate, periods)

  const preppedForecasts = mapObjArrEl(truncatedForecasts, (el) => el * 100)
 
 return {
   ...inputObj,
   forecasts: {
    ...preppedForecasts 
   }
 }

}


function selectArrays(obj, ...args){
  return args.map(el => {
    if (typeof el === 'string'){
      return obj[el]
    }
    return el
  })
}

//combine arrays when do not need to read original forecasts
function combineArrays(operation='SUBTRACT', ...arrays){
    return arrays.reduce((a, b) => {
      return a.map((el, i) => {
        switch (operation){
          case 'subtract':
            return el - b[i]
          case 'add':
            return el + b[i]
          case 'multiply':
            return el * b[i]
          case 'divide':
            return el / b[i]
          default:
            return el - b[i]
        }
      })
    })
  };

function pipe(operation, fn1, fn2){
  return (...args) => {

    const result1 = fn1(...args)

    const result2 = fn2(operation, ...result1)

    return result2
  }
}


// Functions to read from and build forecast calc arrays
const subtractLineItems = pipe('subtract', selectArrays, combineArrays) 
const addLineItems = pipe('add', selectArrays, combineArrays)





function buildForecasts(inputObj){
  const { forecasts, valAssumps, generalInputs } = inputObj

  const gp = subtractLineItems(forecasts, 'revenues', 'cogs')
  const ebitda = subtractLineItems(forecasts, gp, 'opex')
  const ebit = subtractLineItems(forecasts, ebitda, 'depreciation', 'amortization')
  const taxes = ebit.map(el => el < 0 ? 0 : el * valAssumps.taxRate / 100)
   

  const nopat = combineArrays('subtract', ebit, taxes)
  const fcf = combineArrays('subtract', addLineItems(forecasts, nopat, 'depreciation', 'amortization'), addLineItems(forecasts, 'capex', 'nwcChange'))

  const partialPeriods = calcPartialPeriods(generalInputs.fye, generalInputs.valDate, generalInputs.periods)
  const discountPeriods = calcDiscountPeriods(generalInputs.periods, partialPeriods[0])
  const pvFactors = calcPVFactors(valAssumps.wacc, generalInputs.periods, discountPeriods)

  const dcf = combineArrays('multiply', fcf, partialPeriods, pvFactors)

  return {
    forecasts: {
      ...forecasts,
      gp: [...gp],
      ebitda: [...ebitda],
      ebit: [...ebit],
      taxes: [...taxes],
      nopat: [...nopat],
      fcf: [...fcf],
      dcf: [...dcf],
    },
    discounting: {
      discountPeriods: [...discountPeriods],
      pvFactors: [...pvFactors],
      partialPeriods: [...partialPeriods]
    }
  }
}



// discounting calculations

function calcPartialPeriods(fye, valDate, periods){
  const partialPeriods = []

  const days = 365.25
  const a = moment(fye)
  const b = moment(valDate)
  let PP = a.diff(b, 'days') / days
  
  
  for (let i = 0; i < periods; i++){
    if (i === 0){
      partialPeriods.push(PP)
    } else {
      partialPeriods.push(1)
    }
  }

  return partialPeriods
}


function calcDiscountPeriods(periods, partialPeriod){
  const discountPeriods = []
  
  for (let i = 0; i < periods; i++){
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

function calcPVFactors(wacc, periods, discountPeriods){
  const pvFactors = []

  const discountFactor = 1 + Number(wacc / 100)

  for (let i = 0; i < periods; i++){
    pvFactors.push(1 / Math.pow(discountFactor, discountPeriods[i]))
  }
  
  return pvFactors
}


function calcBEV(dcf, TV){
  const discretePeriod = dcf.reduce((a, b) => a + b)
  const BEV = discretePeriod + TV

  return {
    discretePV: discretePeriod,
    consolidated: BEV
  }
}

function calcTV(fcf, wacc, ltgr, pvFactors){
  const terminalCF = fcf[fcf.length - 1] * (1 + ltgr / 100)
  const terminalFactor = (1 / (wacc / 100 - ltgr / 100))
  const terminalValue = (terminalCF * terminalFactor)
  const pvFactor = pvFactors[pvFactors.length - 1]
  const discountedTV = terminalValue * pvFactor

  return {
    values: {
      terminalCF: terminalCF,
      preDiscountTV: terminalValue,
      discountedTV: discountedTV
    },
    pvFactor: pvFactor,
    terminalFactor: terminalFactor
  }
}

function valuation(fcf, dcf, wacc, ltgr, pvFactors){
  const TV = calcTV(fcf, wacc, ltgr, pvFactors)
  const { discountedTV } = TV.values

  const BEV = calcBEV(dcf, discountedTV)

  return {
    TV: TV,
    BEV: BEV
  }
}

function processForecasts(inputs){
  const { wacc, ltgr } = inputs.valAssumps

  const preppedForecasts = prepForecasts(inputs)
  
  const forecastCalcs = buildForecasts(preppedForecasts)
  
  const { fcf, dcf } = forecastCalcs.forecasts
  const { pvFactors } = forecastCalcs.discounting

  const { BEV, TV } = valuation(fcf, dcf, wacc, ltgr, pvFactors)

  const dollarBEV = mapObjArrEl(BEV, (el) => el / 100)
  const dollarTV = mapObjArrEl(TV.values, (el) => el / 100)
  const dollarForecasts = mapObjArrEl(forecastCalcs.forecasts, (el) => el / 100)

  const consolidated = {
    forecasts: {
      ...dollarForecasts
    },
    discounting: {
      ...forecastCalcs.discounting
    },
    BEV: {
      ...dollarBEV
    },
    TV: {
      ...TV,
      values: {
        ...dollarTV
      },
    },
    valAssumps: {
      ...inputs.valAssumps
    },
    generalInputs: {
      ...inputs.generalInputs
    }
  }

  return consolidated
}




module.exports = processForecasts


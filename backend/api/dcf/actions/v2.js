const moment = require('moment')
const numeral = require('numeral')

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
          case 'SUBTRACT':
            return el - b[i]
          case 'ADD':
            return el + b[i]
          case 'MULTIPLY':
            return el * b[i]
          case 'DIVIDE':
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

const subtractLineItems = pipe('SUBTRACT', selectArrays, combineArrays) 
const addLineItems = pipe('ADD', selectArrays, combineArrays)

function buildForecasts(inputObj){
  const forecasts = inputObj.forecasts
  const valInputs = inputObj.valAssumps

  const GP = subtractLineItems(forecasts, 'revenues', 'cogs')
  const EBITDA = subtractLineItems(forecasts, GP, 'opex')
  const EBIT = subtractLineItems(forecasts, EBITDA, 'depreciation', 'amortization')
  const taxes = EBIT.map(el => {
    if (el < 0){
      return 0
    }
    return el * valInputs.taxRate / 100
  })
  const NOPAT = combineArrays('SUBTRACT', EBIT, taxes)
  const FCF = combineArrays('SUBTRACT', addLineItems(forecasts, NOPAT, 'depreciation', 'amortization'), addLineItems(forecasts, 'capex', 'nwcChange'))


  console.log("GP:", GP)
  console.log("EBITDA:", EBITDA)
  console.log("EBIT:", EBIT)
  console.log("Taxes:", taxes)
  console.log("NOPAT:", NOPAT)
  console.log("FCF:", FCF)
}


buildForecasts(inputs)




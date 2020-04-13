const moment = require('moment')

var now = moment('2019-10-01')

const dummyForecasts = {
  forecasts:{
    revenues: [100, 200, 300, 400, 500],
    cogs: [60, 150, 200, 300, 350],
    opex: [50, 50, 50 , 50, 50],
    changeNwc: [20, 35, 40, 45, 50],
    depreciation: [20, 35, 40, 45, 50],
    amortization: [20, 35, 40, 45, 50],
    capex: [10, 10, 10, 10, 10]
  },
  genInputs: {
    valDate: '2019-10-01',
    fye: '2019-12-31',
  },
  valAssumps: {
    wacc: .12,
    taxRate: .25,
    ltgr: .03
  }
}



// class to construct object for the forecasts
class Model {
  constructor(forecasts, genInputs){
    this.forecasts = {
      revenues: [], 
      cogs: [],
      opex: [],
      changeNwc: [],
      capex: [],
      depreciation: [],
      amortization: [],
      calcs: {
        gp: [],
        taxes: [],
        ebitda: [],
        ebit: [],
        nopat: [],
        fcf: [],
        pvFactors: [],
        dcf: [],
        TV: 0,
      }
    },
    this.genInputs = {
      projectionPeriod: 5, //this includes the partial period as a "year" or period 
      valDate: '',
      fye: '',
    }
    this.valAssumps = {
      wacc: '',
      taxRate: '',
      ltgr: ''
    }
    this.BEV = 0
    this.partialPeriod = 0
    this.discountPeriods = []
  }
  updateInputs(inputs){
    this.genInputs = {
      ...this.genInputs,
      ...inputs.genInputs
    }
    this.valAssumps = {
      ...this.valAssumps,
      ...inputs.valAssumps
    }
    const forecastKeys = Object.keys(inputs.forecasts)
    const newObj = {...inputs.forecasts}
    forecastKeys.forEach(el => {
      const idx = inputs.forecasts[el].length - 1
      newObj[el].push(inputs.forecasts[el][idx] * (1 + this.valAssumps.ltgr)) 
    })
    
    this.forecasts = {
      ...this.forecasts,
      ...inputs.forecasts
    }
  }
  calcFCF(){
    const calcYear = (idx) => {
      const forecastCalcs = this.forecasts.calcs
      forecastCalcs.gp.push(this.forecasts.revenues[idx] - this.forecasts.cogs[idx])
      forecastCalcs.ebitda.push(forecastCalcs.gp[idx] - this.forecasts.opex[idx])
      forecastCalcs.ebit.push(forecastCalcs.ebitda[idx] - this.forecasts.depreciation[idx] - this.forecasts.amortization[idx])
      forecastCalcs.taxes.push(forecastCalcs.ebit[idx] * this.valAssumps.taxRate)
      forecastCalcs.nopat.push(forecastCalcs.ebit[idx] - forecastCalcs.taxes[idx])
      forecastCalcs.fcf.push(forecastCalcs.nopat[idx] + this.forecasts.depreciation[idx] + this.forecasts.amortization[idx] - this.forecasts.capex[idx] - this.forecasts.changeNwc[idx])
    }
    for (let i = 0; i < this.genInputs.projectionPeriod + 1; i++){
        calcYear(i)
    }
  }
  calcPartialPeriod(){
    const a = moment(this.genInputs.fye)
    const b = moment(this.genInputs.valDate)
    this.partialPeriod = a.diff(b, 'days')/365.25
  }
  calcDiscountPeriods(){
    for (let i = 0; i < this.genInputs.projectionPeriod; i++){
      if (i === 0){
        this.discountPeriods.push(this.partialPeriod / 2)
      } else if (i === 1){
        this.discountPeriods.push(this.discountPeriods[0] * 2 + 0.5)
      } else {
        this.discountPeriods.push(this.discountPeriods[i - 1] + 1)
      }
    }
  }
  calcPVFactors(){
    const discountFactor = 1 + this.valAssumps.wacc
    for (let i = 0; i < this.genInputs.projectionPeriod; i++){
      this.forecasts.calcs.pvFactors.push(1 / Math.pow(discountFactor, this.discountPeriods[i]))
    }
  }
  calcTerminalValue(){
    const terminalFactor = (1 / (this.valAssumps.wacc - this.valAssumps.ltgr))
    const TV = this.forecasts.calcs.fcf[this.forecasts.calcs.fcf.length - 1] * terminalFactor
    const discountedTV = TV * this.forecasts.calcs.pvFactors[this.forecasts.calcs.pvFactors.length - 1]
    this.forecasts.calcs.TV = discountedTV
  }
  calcBEV(){
    const dcf = this.forecasts.calcs.dcf
    const pvFactors = this.forecasts.calcs.pvFactors
    const fcf = this.forecasts.calcs.fcf
    let pvCashFlow
    for (let i = 0; i < this.genInputs.projectionPeriod; i++){
      pvCashFlow = fcf[i] * pvFactors[i]
      dcf.push(pvCashFlow)
    }
    console.log(dcf)
    const discretePV = dcf.reduce((a, b) => a + b)
    this.BEV = discretePV + this.forecasts.calcs.TV
  }
}

let model = new Model()
model.updateInputs(dummyForecasts)
model.calcFCF()
model.calcPartialPeriod()
model.calcDiscountPeriods()
model.calcPVFactors()
model.calcTerminalValue()
model.calcBEV()

console.log(model)
console.log(model.forecasts.calcs)


module.exports = Model
  


/*
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
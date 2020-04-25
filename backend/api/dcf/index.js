const processForecasts = require('./actions/forecasts')
const express = require('express')
const router = express.Router()

const models = []

// template = {
//   forecasts: {
//     revenues: [],
//     cogs: [],
//     opex: [],
//     nwcChange: [],
//     depreciation: [],
//     amortization: [],
//     capex: [],
//     gp: [],
//     ebitda: [],
//     ebit: [],
//     taxes: [],
//     nopat: [],
//     fcf: [],
//     dcf: []
//   },
//   discounting: {
//     discountPeriods: [],
//     pvFactors: [],
//     partialPeriods: []
//   },
//   BEV: { 
//     discretePV: '', 
//     consolidated: '' 
//   },
//   TV: {
//     terminalCF: '',
//     preDiscountTV: '',
//     discountedTV: '',
//     terminalFactor: ''
//   },
//   valAssumps: { wacc: '', taxRate: '', ltgr: '' },
//   genInputs: { periods: 5, valDate: '', fye: '' }
// }

router.post('/', (req, res) => {
    const model = processForecasts(req.body)
    console.log(model.TV)
    res.status(200).json(model)
})

router.get('/', (req, res) => {
    res.json(models[0])
})

module.exports = router



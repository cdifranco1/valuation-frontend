const processForecasts = require('./actions/forecasts')
const express = require('express')
const router = express.Router()

const models = []

router.post('/', (req, res) => {
    const model = processForecasts(req.body)
    if (model){
      models.push(model)
      res.status(200).json(models[0])
    }
    console.log(models)
})

router.get('/', (req, res) => {
    res.json({ message: "DCF model endopoint."})
})

module.exports = router



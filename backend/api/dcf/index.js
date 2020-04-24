const processForecasts = require('./actions/forecasts')
const express = require('express')
const router = express.Router()

const models = []

router.post('/', (req, res) => {
    const model = processForecasts(req.body)
    models.push(model)
    res.status(200).json(model)
})

router.get('/', (req, res) => {
    res.json(models[0])
})

module.exports = router



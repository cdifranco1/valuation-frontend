const process = require('../actions/forecasts')
const { DCF } = require('../models/dcf-model')

const express = require('express')
const router = express.Router()

router.post('/', async (req, res) => {
    console.log(req)
    const dcfModel = process(req.body)

    console.log(dcfModel)

    try {
      // create new collection from DCF model (think of a model as a class)
      const dcf = new DCF(dcfModel)
      const saved = await dcf.save()

      res.status(200).json(saved)

    } catch (err) {
      res.status(500).json({ error: err.message })
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    const dcfModel = process(req.body)
    try {
      // create new collection from DCF model (think of a model as a class)
      const response = await DCF.replaceOne({ _id: id }, dcfModel)

      const updated = await DCF.findById(id)

      res.status(200).json(updated)

    } catch (err) {
      res.status(500).json({ error: err.message })
    }
})

module.exports = router

const process = require('../actions/forecasts')
const { DCF } = require('../models/dcf-model')

const express = require('express')
const router = express.Router()
const authorization = require('../middleware/authorization')

router.use('/', authorization)

router.post('/', async (req, res) => {
    console.log(req.body)
    let dcfModel = process(req.body)
    console.log(dcfModel)
    dcfModel.userId = req.userId

    try {
      const dcf = new DCF(dcfModel)
      const saved = await dcf.save()
      console.log(saved)
      res.status(200).json(saved)

    } catch (err) {
      res.status(500).json({ error: err.message })
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    const dcfModel = process(req.body)
    try {
      const response = await DCF.findByIdAndUpdate({ _id: id }, dcfModel, { new: true })

      res.status(200).json(response)

    } catch (err) {
      res.status(500).json({ error: err.message })
    }
})

//get by id
router.get('/:id', async (req, res) => {
    const { id } = req.params

    try {
      const dcf = await DCF.findById(id)

      res.status(200).json(dcf)

    } catch (err) {
      res.status(500).json({ error: err.message })
    }
})

//get all models
router.get('/', async (req, res) => {
    const { userId } = req

    try {
      const dcfs = await DCF.find({ userId: userId })
                            .select('genInputs createdAt updatedAt')

      res.status(200).json(dcfs)

    } catch (err) {
      res.status(500).json({ error: err.message })
    }
})

router.delete('/', async (req, res) => {
    const { userId } = req

    try {
      const dcfs = await DCF.find({ userId: userId })
                            .select({ genInputs: 1, createdAt: 1, updatedAt: 1})

      res.status(200).json(dcfs)

    } catch (err) {
      res.status(500).json({ error: err.message })
    }
})

module.exports = router

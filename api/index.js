const cors = require('cors')

const Model = require('./forecasts')
const express = require('express')
const server = express()

server.use(express.json())
server.use(cors())



server.post('/', (req, res) => {
    const newModel = new Model(req.body)
    processForecasts(newModel)
    if (newModel){
      models.push(newModel)
      res.status(200).json(models[0])
    }
    console.log(models)
})

server.get('/', (req, res) => {
    res.status(200).json("Server is running.")
})


server.listen(5000, () => {
  console.log(`Listening on port 5000`)
})



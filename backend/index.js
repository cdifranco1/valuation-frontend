const cors = require('cors')
const express = require('express')
const apiRoute = require('./api')

const port = process.env.PORT || 5000

const server = express()

//app-level middleware
server.use(express.json())
server.use(cors())

//api route
server.use('/api', apiRoute)

server.get('/', (req, res) => {
  res.status(200).json("Server is running.")
})

server.listen(port, () => {
  console.log(`Listening on port 5000`)
})

module.exports = server
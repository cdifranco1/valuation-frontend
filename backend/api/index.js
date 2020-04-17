const express = require('express')
const router = express.Router()
const dcfRoute = require('./dcf')

//routes
router.use('/dcf', dcfRoute)

module.exports = router
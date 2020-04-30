// set up database connection and routing here
const mongoose = require('mongoose')
const dcfRoute = require('./routes/dcf')
const router = require('express').Router()

mongoose.connect(`mongodb://localhost/valuation`)
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err))

mongoose.set('useFindAndModify', false )


//routes
router.use('/dcf', dcfRoute)


module.exports = router
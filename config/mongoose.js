const mongoose = require('mongoose')
const db = mongoose.connection


mongoose.connect('mongodb://localhost/short-url')

db.on('error', () => {
  console.log('connected error')
})

db.once('open', () => {
  console.log('connected success!')
})

const express = require('express')
const { engine } = require('express-handlebars')



const mongoose = require('mongoose')
const db = mongoose.connection

const shortenURL = require('./shortenURL')

const routes = require('./routes/index')

const port = 3000
const app = express()

mongoose.connect('mongodb://localhost/short-url')

app.engine('hbs', engine({ extname: '.hbs', defaultLayout: "main" }));
app.set('view engine', 'hbs');

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(routes)

db.on('error', () => {
  console.log('connected error')
})

db.once('open', () => {
  console.log('connected success!')
})


app.listen(port, () => {
  console.log(`http://localhost:${port} is running`)
})
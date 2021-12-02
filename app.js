const express = require('express')
const { engine } = require('express-handlebars')

const routes = require('./routes/index')
require('./config/mongoose')

const port = 3000
const app = express()


app.engine('hbs', engine({ extname: '.hbs', defaultLayout: "main" }));
app.set('view engine', 'hbs');

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(routes)


app.listen(port, () => {
  console.log(`http://localhost:${port} is running`)
})
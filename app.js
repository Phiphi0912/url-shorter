const express = require('express')
const { engine } = require('express-handlebars')

const url = require('./models/url')

const mongoose = require('mongoose')
const db = mongoose.connection

const shortenURL = require('./shortenURL')

const port = 3000
const app = express()

mongoose.connect('mongodb://localhost/short-url')

app.engine('hbs', engine({ extname: '.hbs', defaultLayout: "main" }));
app.set('view engine', 'hbs');

app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))

db.on('error', () => {
  console.log('connected error')
})

db.once('open', () => {
  console.log('connected success!')
})


app.get('/', (req, res) => {
  res.render('index')
})

app.post('/submit', (req, res) => {
  const originalURL = req.body.url
  //判斷資料庫有無輸入的原始網址，如果有拿出已儲存的網址返回，沒有則create一個新的
  url.find({ originalURL: originalURL })
    .lean()
    .then(shortener => {
      if (shortener.length === 0) {
        const shortURL = shortenURL()
        url.create({ originalURL, shortURL })
          .then(() => res.render('show', { originalURL, shortURL }))
      } else {
        res.render('show', { originalURL, shortURL: shortener[0].shortURL })
      }
    })
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`http://localhost:${port} is running`)
})
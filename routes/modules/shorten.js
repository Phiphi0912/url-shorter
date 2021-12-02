const express = require('express')
const router = express.Router()
const url = require('../../models/url')

router.post('/submit', (req, res) => {
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


module.exports = router
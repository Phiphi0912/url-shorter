const express = require('express')
const router = express.Router()
const url = require('../../models/url')
const shortenURL = require('../../shortenURL')

router.post('/submit', (req, res) => {
  const originalURL = req.body.url.trim()
  const randomCode = shortenURL()
  if (!originalURL) return
  //判斷資料庫有無輸入的原始網址，如果有拿出已儲存的網址返回，沒有則create一個新的
  url.find({ originalURL })
    .lean()
    .then(shortener => {
      if (shortener.length === 0) {
        const shortURL = req.headers.host + '/' + randomCode   //固定短網址格式為localhost:3000/randomCode
        return url.create({ originalURL, shortURL, randomCode })
          .then(() => res.render('show', { originalURL, shortURL }))
          .catch(error => console.log(error))
      } else {
        res.render('show', { originalURL, shortURL: shortener[0].shortURL }) // 輸入相同網址時，直接從資料庫拿出來時，而此時拿出會是陣列，所以需要[0]
      }
    })
    .catch(error => console.log(error))
})


module.exports = router
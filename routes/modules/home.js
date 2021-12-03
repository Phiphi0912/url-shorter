const express = require('express')
const router = express.Router()
const url = require('../../models/url')

router.get('/', (req, res) => {
  res.render('index')
})

router.get('/:short', (req, res) => {
  const randomCode = req.params.short

  url.findOne({ randomCode })
    .lean()
    .then((shortener) => res.redirect(`${shortener.originalURL}`))
    .catch(error => console.log(error))
})

module.exports = router
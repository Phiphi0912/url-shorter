const mongoose = require('mongoose')
const Schema = mongoose.Schema

const urlSchema = new Schema({
  originalURL: { type: 'string', required: true },
  shortURL: { type: 'string', required: true },
  randomCode: { type: 'string', required: true }
})

module.exports = mongoose.model('URL', urlSchema)
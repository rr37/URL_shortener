const mongoose = require('mongoose')
const Url = require('../url')
const urlList = require('./url.json').results

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('running urlSeeder script...')
  Url.create(urlList)
    .then(() => {
      console.log('urlSeeder done!')
      db.close()
    })
    .catch(err => console.log(err))
})
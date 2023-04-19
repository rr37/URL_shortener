const db = require('../../config/mongoose')

const Url = require('../url')
const urlList = require('./url.json').results

db.once('open', () => {
  console.log('running urlSeeder script...')
  Url.create(urlList)
    .then(() => {
      console.log('urlSeeder done!')
      db.close()
    })
    .catch(err => console.log(err))
})

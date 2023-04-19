const express = require('express')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const Url = require('./models/url')

// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
  res.render('index')
})

// 轉址到設定的位置
app.get('/:id', (req, res) => {
  const id = req.params.id
  // 在資料庫中，尋找短網址後五位數等於 id 的那筆資料
  Url.findOne({ code: id })
    .then((docs) => {
      // 找不到資料就回到首頁吧
      if (docs === null) {
        res.render('index', {id})
      } else {
        // 重新轉址到該 url
        res.redirect(docs.url)
      }
    })
    .catch((err) => {
      console.log(err)
    })
})

app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})
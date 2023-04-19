// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
const Url = require('../../models/url')
const generateCode = require('../../generate_code')
const appUrl = process.env.APP_URL || 'http://localhost:3000/'
// 定義首頁路由
router.get('/', (req, res) => {
  res.render('index')
})

router.post('/', async (req, res) => {
  const code = await generateCode(5)
  const url = req.body.url

  Url.findOne({ url: url })
    // 檢查資料庫是否有一樣的網址資料，避免重複轉網址
    .then((docs) =>
      docs ? docs : Url.create({ code: code, url: url })
    )
    .then((docs) =>
      res.render('index', {
        code: docs.code,
        url,
        shortUrl: appUrl + docs.code
      })
    )
    .catch((err) => {
      console.log(err)
    })
})

// 轉址到設定的位置
router.get('/:id', (req, res) => {
  const id = req.params.id
  // 在資料庫中，尋找短網址後五位數等於 id 的那筆資料
  Url.findOne({ code: id })
    .then((docs) => {
      // 找不到資料就回到首頁吧
      if (docs === null) {
        res.render('index', { id, appUrl })
      } else {
        // 重新轉址到該 url
        res.redirect(docs.url)
      }
    })
    .catch((err) => {
      console.log(err)
    })
})

// 匯出路由器
module.exports = router
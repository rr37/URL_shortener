const mongoose = require('mongoose')
const Url = require('./models/url')

// 加入這段 code, 僅在非正式環境時, 使用 dotenv
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

async function generateCode(length) {
  const collection = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let code = ''
  for (let i = 0; i < length; i++) {
    code += collection.charAt(Math.floor(Math.random() * collection.length))
  }
  const url = await Url.findOne({ code: code })
  if (url) {
    // 如果已經有相同的短網址碼，就重新產生新的
    return generateCode(length)
  } else {
    return code
  }
}

// export generateCode function for other files to use
module.exports = generateCode
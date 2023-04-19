require('./config/mongoose')
const Url = require('./models/url')

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
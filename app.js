const express = require('express')
const exphbs = require('express-handlebars')
const appUrl = process.env.APP_URL || 'http://localhost:3000/'
require('./config/mongoose')

// 引用路由器
const routes = require('./routes')
const app = express()
app.use(express.static('public'))
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(express.urlencoded({ extended: true }))

// 將 request 導入路由器
app.use(routes)

app.listen(3000, () => {
  console.log(`App is running on ${appUrl}`)
})
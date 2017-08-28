const express = require('express')
const cookieParser = require('cookie-parser')

const app = express()

app.use(cookieParser())

app.get('/', function(req, res){
  if (req.cookies.isVisit) {
    res.send('第二次访问')
  } else {
    res.cookie('isVisit', 1, {maxAge: 60 * 1000})
    res.send('第一次访问')
  }
})

app.listen('3456', function(){
  console.log('ok')
})
const express = require('express')
const crypto = require('crypto')

const app = express()
app.get('/', function(req, res){
  const query = req.query.q
  const md5 = crypto.createHash('md5')
  const md5Value = md5.update(query).digest('hex')
  res.send(md5Value)
})

app.listen('3456', function(){
  console.log('app is listening on port 3456')
})

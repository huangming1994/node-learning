var express = require('express')
var crypto = require('crypto')

var app = express()
app.get('/', function(req, res){
  var query = req.query.q
  var md5 = crypto.createHash('md5')
  var md5Value = md5.update(query).digest('hex')
  res.send(md5Value)
})

app.listen('3456', function(){
  console.log('app is listening on port 3456')
})

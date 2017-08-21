const express = require('express')
const app = express()

app.get('/', function(req, res){
  res.send('Hello World')
})

app.listen('3456', function(){
  console.log('app is listening on port 3456')
})
var express = require('express')
var superagent = require('superagent')
var cheerio = require('cheerio')

var app = express()
app.get('/', function(req, res){
  superagent.get('http://cnodejs.org/')
  .then(function(sres){
    var $ = cheerio.load(sres.text)
    var item = []
    $('#topic_list .topic_title').each(function(index, ele){
      var $element = $(ele)
      item.push({
        title: $element.attr('title'),
        href: $element.attr('href')
      })
    })
    res.send(JSON.stringify(item, undefined, 10))
  })
})

app.listen('3456', function(){
  console.log('ok')
})
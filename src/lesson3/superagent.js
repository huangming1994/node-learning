const express = require('express')
const superagent = require('superagent')
const cheerio = require('cheerio')

const app = express()
app.get('/', function(req, res){
  superagent.get('http://cnodejs.org/')
  .then(function(sres){
    const $ = cheerio.load(sres.text)
    const item = []
    $('#topic_list .topic_title').each(function(index, ele){
      const $element = $(ele)
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
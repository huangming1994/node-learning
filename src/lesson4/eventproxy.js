var express = require('express')
var eventproxy = require('eventproxy')
var cheerio = require('cheerio')
var superagent = require('superagent')
var url = require('url')

var app = express()
var cnodeUrl = 'http://cnodejs.org/'

superagent.get(cnodeUrl)
.then(function(res){
  var topicUrls = []
  var $ = cheerio.load(res.text)
  $('#topic_list .topic_title')
  .filter(function(index){
    return index < 3
  })
  .each(function(index, ele){
    var $element = $(ele)
    var href = url.resolve(cnodeUrl, $element.attr('href'))
    topicUrls.push(href)
  })

  var ep = new eventproxy()
  ep.after('topic_html', topicUrls.length, function(topics){
    var result = topics.map(function(topicPair){
      var topicUrl = topicPair[0]
      var topicHtml = topicPair[1]
      var $ = cheerio.load(topicHtml)
      return ({
        title: $('.topic_full_title').text().trim(),
        href: topicUrl,
        comment1: $('.reply_content').eq(0).text().trim()
      })
    })
    console.log('result--------->', result)
  })

  topicUrls.forEach(function(topicUrl){
    superagent.get(topicUrl)
    .end(function(err, res){
      if(err) console.log('err', err)
      ep.emit('topic_html', [topicUrl, res.text])
    })
  })
})

app.listen('3456', function(){
  console.log('ok')
})
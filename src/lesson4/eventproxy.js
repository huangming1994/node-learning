const express = require('express')
const eventproxy = require('eventproxy')
const cheerio = require('cheerio')
const superagent = require('superagent')
const url = require('url')

const app = express()
const cnodeUrl = 'http://cnodejs.org/'

superagent.get(cnodeUrl)
.then(function(res){
  const topicUrls = []
  const $ = cheerio.load(res.text)
  $('#topic_list .topic_title')
  .filter(function(index){
    return index < 3
  })
  .each(function(index, ele){
    const $element = $(ele)
    const href = url.resolve(cnodeUrl, $element.attr('href'))
    topicUrls.push(href)
  })

  const ep = new eventproxy()
  ep.after('topic_html', topicUrls.length, function(topics){
    const result = topics.map(function(topicPair){
      const topicUrl = topicPair[0]
      const topicHtml = topicPair[1]
      const $ = cheerio.load(topicHtml)
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
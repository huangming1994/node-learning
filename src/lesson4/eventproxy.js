const express = require('express')
const eventproxy = require('eventproxy')
const cheerio = require('cheerio')
const superagent = require('superagent')
const url = require('url')
const async = require('async')

const app = express()
const cnodeUrl = 'http://cnodejs.org/'
// eventproxy控制并发
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


// async控制并发
const topicUrls = []
superagent.get(cnodeUrl)
.then(function(res) {
  const $ = cheerio.load(res.text)
  $('#topic_list .topic_title')
  .each(function (index, ele) {
    const $element = $(ele)
    const href = url.resolve(cnodeUrl, $element.attr('href'))
    topicUrls.push(href)
  })
  async.mapLimit(topicUrls, 3, (url, callback) => {
    superagent.get(url)
    .end(function(err, res){
      if(err) console.log('err', err)
      console.log(`${url}请求成功`)
      callback(null, res)
    })
  }, (err, result) => {
  })
})

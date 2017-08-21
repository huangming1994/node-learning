const async = require('async')

let concurrencyCount = 0
const fetchAPI = (url, callback) => {
  const delay = parseInt(Math.random() * 2000)
  concurrencyCount++
  console.log(`现在的并发数是,${concurrencyCount},正在抓取的是,${url},耗时${delay}毫秒`);
  setTimeout(() => {
    concurrencyCount--
    callback()
  }, delay)
}

const urls = Array.from({ length: 30 }, (v, i) => `http://datasource_${i}`)

async.mapLimit(urls, 5, function (url, callback) {
  fetchAPI(url, callback);
}, function (err, result) {
})
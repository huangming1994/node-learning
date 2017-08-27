// DeprecationWarning: `open()` is deprecated in mongoose >= 4.11.0,
// use `openUri()` instead, or set the `useMongoClient` option if using `connect()` or `createConnection()`.
// See http://mongoosejs.com/docs/connections.html#use-mongo-client
// 1、npm uninstall mongoose  2、npm install mongoose@4.10.8 --save  解决上述warning
const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/test')

mongoose.Promise = global.Promise  //  Mongoose: mpromise (mongoose's default promise library) is deprecated, plug in your own promise library instead: http://mongoosejs.com/docs/promises.html
const Person = mongoose.model('Person', {
  name: String,
  age: Number,
  job: String,
})

const xiaoming = new Person({ name: 'xiaoming', age: 18, job: '学生' })

xiaoming.save(function(err){
  if (err) console.log(err)
})
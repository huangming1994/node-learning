const fs = require('fs')

fs.readFile('a.txt', (err, data) => console.log(data.toString()))
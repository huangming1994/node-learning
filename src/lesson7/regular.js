const web_development = 'python php ruby javascript jsonp perhapsphpisoutdated'

const matchArr = web_development.match(/\b\w+(p[^h]\b)/g)
console.log(matchArr) // [ 'python', 'javascript', 'jsonp' ]

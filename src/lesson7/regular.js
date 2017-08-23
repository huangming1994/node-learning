const web_development = 'python php ruby javascript jsonp perhapsphpisoutdated'

const matchArr = web_development.match(/\b\w+(p[^h]\b)/gm)
console.log(matchArr) // [ 'python', 'javascript', 'jsonp' ]

var yaml = require('js-yaml')
var fs = require('fs')

// adds !md (markdown) type handling to js-yaml
var MARKDOWN_SCHEMA = require('./MARKDOWN_SCHEMA')

var args = process.argv.splice(process.execArgv.length + 2)

args
  .map(str => /\.yml$/i.test(str)
    ? str.replace(/(.*)\.yml/i, '$1')
    : str)
  .forEach(function (filename) {
    try {
      var output = yaml.safeLoad(fs.readFileSync(filename + '.yml', 'utf8'), { schema: MARKDOWN_SCHEMA })
    } catch (e) {
      console.log(e)
    }
    fs.writeFile(filename + '.json', JSON.stringify(output), function (err) {
      if (err) return console.log(err)
      console.log('created > %s.json', filename)
    })
  })

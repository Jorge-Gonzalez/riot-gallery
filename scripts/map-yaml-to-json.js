#!/usr/bin/env node

const yaml = require('js-yaml')
const fs = require('mz/fs')
const path = require('path')
// adds !md (markdown) type handling to js-yaml
const MARKDOWN_SCHEMA = require('./MARKDOWN_SCHEMA')
const program = require('commander')
const yamlExtRegex = /\.ya?ml$/i

program
  .version('0.0.1')
  .arguments('<src> [dest]')
  .action(main)
  .parse(process.argv)

async function main (src, dest) {
  let ls = await fs.readdir(src)
  let files = ls.filter(filename => yamlExtRegex.test(filename))
  dest = dest || src
  files.forEach(async filename => {
    let result
    let filenameJson
    try {
      result = yaml.safeLoad(await fs.readFile(path.resolve(src, filename), 'utf8'), { schema: MARKDOWN_SCHEMA })
    } catch (e) {
      console.log(e)
    }
    filenameJson = filename.replace(yamlExtRegex, '.json')
    fs.writeFile(path.resolve(dest, filenameJson), JSON.stringify(result), function (err) {
      if (err) return console.log(err)
      console.log('Created %s/%s', dest, filenameJson)
    })
  })
}

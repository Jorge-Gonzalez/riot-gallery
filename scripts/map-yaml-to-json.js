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
    let output
    try {
      output = yaml.safeLoad(await fs.readFile(path.resolve(src, filename), 'utf8'), { schema: MARKDOWN_SCHEMA })
    } catch (e) {
      console.log(e)
    }
    fs.writeFile(path.resolve(dest, filename.replace(yamlExtRegex, '.json')), JSON.stringify(output), function (err) {
      if (err) return console.log(err)
      console.log('Created %s/%s', dest, filename)
    })
  })
}

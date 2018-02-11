const program = require('commander')

const { name, version } = require('./package.json')

program
  .version(`${name} - ${version}`)
  .parse(process.argv)

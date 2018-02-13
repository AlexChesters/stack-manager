#!/usr/bin/env node

const program = require('commander')

const create = require('./commands/create')

program
  .command('create')
  .arguments('<stack-name> <template-path>')
  .action((name, templatePath) => (
    create({ name, templatePath }))
  )

program.parse(process.argv)

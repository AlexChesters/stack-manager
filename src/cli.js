#!/usr/bin/env node

const program = require('commander')

const create = require('./commands/create')

program
  .command('create')
  .arguments('<project-name> <template-path>')
  .action((projectName, templatePath) => (
    create({ projectName, templatePath }))
  )

program.parse(process.argv)

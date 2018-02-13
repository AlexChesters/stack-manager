#!/usr/bin/env node

const program = require('commander')

const createCommand = require('./commands/create')
const deleteCommand = require('./commands/delete')

program
  .command('create')
  .arguments('<project-name> <template-path>')
  .action((projectName, templatePath) => (
    createCommand({ projectName, templatePath }))
  )

program
  .command('delete')
  .arguments('<project-name> <template-path>')
  .action((projectName, templatePath) => (
    deleteCommand({ projectName, templatePath })
  ))

program.parse(process.argv)

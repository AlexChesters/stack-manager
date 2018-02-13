#!/usr/bin/env node

const program = require('commander')

const createCommand = require('./commands/create')
const deleteCommand = require('./commands/delete')
const updateCommand = require('./commands/update')

program
  .command('create')
  .arguments('<template-path>')
  .action((templatePath) => (
    createCommand({ templatePath }))
  )

program
  .command('delete')
  .arguments('<template-path>')
  .action((templatePath) => (
    deleteCommand({ templatePath })
  ))

program
  .command('update')
  .arguments('<template-path>')
  .action((templatePath) => (
    updateCommand({ templatePath })
  ))

program.parse(process.argv)

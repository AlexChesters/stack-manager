#!/usr/bin/env node

const program = require('commander')

const createCommand = require('./commands/create')
const deleteCommand = require('./commands/delete')
const updateCommand = require('./commands/update')

program
  .command('create')
  .arguments('<template-path> [capability]')
  .action((templatePath, capability) => (
    createCommand(templatePath, capability)
      .catch((err) => {
        console.error(`Error creating stack: ${err}`)
      })
  ))

program
  .command('delete')
  .arguments('<template-path>')
  .action((templatePath) => (
    deleteCommand(templatePath)
      .catch((err) => {
        console.error(`Error deleting stack: ${err}`)
      })
  ))

program
  .command('update')
  .arguments('<template-path> [capability]')
  .action((templatePath, capability) => (
    updateCommand(templatePath, capability)
      .catch((err) => {
        console.error(`Error updating stack: ${err}`)
      })
  ))

program.parse(process.argv)

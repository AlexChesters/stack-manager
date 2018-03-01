#!/usr/bin/env node

const program = require('commander')
const chalk = require('chalk')

const createCommand = require('./commands/create')
const deleteCommand = require('./commands/delete')
const updateCommand = require('./commands/update')

program
  .command('create')
  .arguments('<template-path> [capability]')
  .action((templatePath, capability) => (
    createCommand(templatePath, capability)
      .catch((err) => {
        console.error(
          chalk.red('[ERROR]') +
          ' Error creating stack: ' +
          chalk.red(err)
        )
      })
  ))

program
  .command('delete')
  .arguments('<template-path>')
  .action((templatePath) => (
    deleteCommand(templatePath)
      .catch((err) => {
        console.error(
          chalk.red('[ERROR]') +
          ' Error deleting stack: ' +
          chalk.red(err)
        )
      })
  ))

program
  .command('update')
  .arguments('<template-path> [capability]')
  .action((templatePath, capability) => (
    updateCommand(templatePath, capability)
      .catch((err) => {
        console.error(
          chalk.red('[ERROR]') +
          ' Error updating stack: ' +
          chalk.red(err)
        )
      })
  ))

program.parse(process.argv)

#!/usr/bin/env node

const program = require('commander')
const chalk = require('chalk')

const createCommand = require('./commands/create')
const deleteCommand = require('./commands/delete')
const updateCommand = require('./commands/update')

program
  .command('create')
  .arguments('<template-path> [region] [capability]')
  .action((templatePath, region, capability) => (
    createCommand(templatePath, capability, region)
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
  .arguments('<template-path> [region]')
  .action((templatePath, region) => (
    deleteCommand(templatePath, region)
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
  .arguments('<template-path> [region] [capability]')
  .action((templatePath, region, capability) => (
    updateCommand(templatePath, capability, region)
      .catch((err) => {
        console.error(
          chalk.red('[ERROR]') +
          ' Error updating stack: ' +
          chalk.red(err)
        )
      })
  ))

program.parse(process.argv)

const createCommand = require('./commands/create')
const deleteCommand = require('./commands/delete')
const updateCommand = require('./commands/update')

module.exports = {
  create: createCommand,
  delete: deleteCommand,
  update: updateCommand
}

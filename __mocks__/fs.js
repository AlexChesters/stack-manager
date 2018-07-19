/* eslint-env jest */

const fs = jest.genMockFromModule('fs')

const readFileSync = (fp) => {
  return JSON.stringify([
    {
      key: 'some key',
      value: 'some value'
    }
  ])
}

fs.readFileSync = readFileSync

module.exports = fs

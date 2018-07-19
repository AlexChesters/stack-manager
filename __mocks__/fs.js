/* eslint-env jest */

const fs = jest.genMockFromModule('fs')

const readFileSync = (fp) => {
  return JSON.stringify({
    SomeKey: 'some-value'
  })
}

const existsSync = () => true

fs.readFileSync = readFileSync
fs.existsSync = existsSync

module.exports = fs

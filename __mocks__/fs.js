/* eslint-env jest */

const fs = jest.genMockFromModule('fs')

const readFileSync = (fp) => {
  return JSON.stringify({
    SomeKey: 'some-value'
  })
}

fs.readFileSync = readFileSync

module.exports = fs

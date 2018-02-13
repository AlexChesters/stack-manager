/* eslint-env jest */

const generateStackName = require('../../src/utils/generate-stack-name')

describe('generateStackName', function () {
  it('should correctly generate a stack name', function () {
    const path = 'path/to/template.json'
    expect(generateStackName(path)).toEqual(`stack-manager--path-to-template`)
  })
})

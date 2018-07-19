/* eslint-env jest */

jest.mock('fs')

const getParameters = require('../../src/utils/get-parameters')

describe('getParameters', function () {
  afterEach(function () {
    jest.unmock('fs')
  })

  fit('should adapt parameters to the expected format', function () {
    const params = getParameters('params.json')
    expect(params).toEqual([
      {
        ParameterKey: 'SomeKey',
        ParameterValue: 'some-value'
      }
    ])
  })
})

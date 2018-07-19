/* eslint-env jest */

jest.mock('fs')

const getParameters = require('../../src/utils/get-parameters')

describe('getParameters', function () {
  afterEach(function () {
    jest.unmock('fs')
  })

  it('should return an empty array if no path is given', function () {
    expect(getParameters()).toEqual([])
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

/* eslint-env jest */

jest.mock('fs')

const getParameters = require('../../src/utils/get-parameters')

describe('getParameters', function () {
  afterEach(function () {
    jest.unmock('fs')
  })

  it('should return an empty array if no path is given', async function () {
    expect(await getParameters()).toEqual([])
  })
  fit('should adapt parameters to the expected format', async function () {
    const params = await getParameters('params.json')
    expect(params).toEqual([
      {
        ParameterKey: 'some key',
        ParameterValue: 'some value'
      }
    ])
  })
})

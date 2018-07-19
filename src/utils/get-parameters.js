const path = require('path')
const fs = require('fs')

module.exports = (parameterPath) => {
  return new Promise((resolve, reject) => {
    if (!parameterPath) {
      return resolve([])
    }
    const fp = path.join(process.cwd(), parameterPath)
    const data = JSON.parse(fs.readFileSync(fp))
    return resolve(
      data.map(({ key, value }) => {
        return { ParameterKey: key, ParameterValue: value }
      })
    )
  })
}

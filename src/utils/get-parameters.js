const path = require('path')
const fs = require('fs')

module.exports = (parameterPath) => {
  if (!parameterPath) {
    return []
  }
  const fp = path.join(process.cwd(), parameterPath)
  const data = JSON.parse(fs.readFileSync(fp))
  return data.map(({ key, value }) => {
    return { ParameterKey: key, ParameterValue: value }
  })
}

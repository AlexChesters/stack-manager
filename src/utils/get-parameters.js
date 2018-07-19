const fs = require('fs')

module.exports = (parameterPath) => {
  const exists = fs.existsSync(parameterPath)
  if (!exists) return []

  const data = JSON.parse(fs.readFileSync(parameterPath))
  return Object.keys(data).map((key) => {
    return { ParameterKey: key, ParameterValue: data[key] }
  })
}

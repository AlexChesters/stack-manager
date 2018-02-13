const AWS = require('aws-sdk')

const cloudformation = new AWS.CloudFormation({ region: 'eu-west-1' })

const generateStackName = require('../../utils/generate-stack-name')

module.exports = ({ templatePath }) => {
  const stackName = generateStackName(templatePath)
  const params = {
    StackName: stackName
  }
  return cloudformation
    .deleteStack(params)
    .promise()
    .then(() => {
      return cloudformation
        .waitFor('stackDeleteComplete', { StackName: stackName })
        .promise()
    })
}

const AWS = require('aws-sdk')

const cloudformation = new AWS.CloudFormation({ region: 'eu-west-1' })

const generateStackName = require('../../utils/generate-stack-name')

module.exports = ({ templatePath }) => {
  const params = {
    StackName: generateStackName(templatePath)
  }
  return cloudformation.deleteStack(params).promise()
}

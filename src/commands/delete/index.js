const AWS = require('aws-sdk')

const cloudformation = new AWS.CloudFormation({ region: 'eu-west-1' })

const generateStackName = require('../../utils/generate-stack-name')

module.exports = ({ projectName, templatePath }) => {
  const params = {
    StackName: generateStackName(projectName, templatePath)
  }
  return cloudformation.deleteStack(params).promise()
}

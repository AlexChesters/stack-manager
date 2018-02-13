const path = require('path')

const AWS = require('aws-sdk')

const generateStackName = require('../../utils/generate-stack-name')

const cloudformation = new AWS.CloudFormation({ region: 'eu-west-1' })

module.exports = ({ templatePath }) => {
  const params = {
    StackName: generateStackName(templatePath),
    Capabilities: ['CAPABILITY_IAM'],
    TemplateBody: JSON.stringify(require(path.join(process.cwd(), templatePath)))
  }
  return cloudformation.createStack(params).promise()
}

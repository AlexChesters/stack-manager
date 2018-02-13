const path = require('path')

const AWS = require('aws-sdk')

const generateStackName = require('../../utils/generate-stack-name')

const cloudformation = new AWS.CloudFormation({ region: 'eu-west-1' })

module.exports = ({ templatePath }) => {
  const stackName = generateStackName(templatePath)
  const params = {
    StackName: stackName,
    Capabilities: ['CAPABILITY_IAM'],
    TemplateBody: JSON.stringify(require(path.join(process.cwd(), templatePath)))
  }
  return cloudformation
    .createStack(params)
    .promise()
    .then(() => {
      return cloudformation
        .waitFor('stackCreateComplete', { StackName: stackName })
        .promise()
    })
}

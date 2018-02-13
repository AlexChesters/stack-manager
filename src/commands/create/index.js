const AWS = require('aws-sdk')

const cloudformation = new AWS.CloudFormation()

module.exports = ({ name, templatePath }) => {
  const params = {
    StackName: name,
    Capabilities: 'CAPABILITY_IAM',
    TemplateBody: JSON.stringify(require(templatePath))
  }
  return cloudformation.createStack(params).promise()
}

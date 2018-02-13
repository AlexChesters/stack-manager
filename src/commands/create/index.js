const path = require('path')

const AWS = require('aws-sdk')

const cloudformation = new AWS.CloudFormation({ region: 'eu-west-1' })

module.exports = ({ projectName, templatePath }) => {
  const segments = templatePath.split('infrastructure/stacks/')
  const params = {
    StackName: `${projectName}--${segments[segments.length - 1].replace(/\//g, '-').slice(0, -5)}`,
    Capabilities: ['CAPABILITY_IAM'],
    TemplateBody: JSON.stringify(require(path.join(process.cwd(), templatePath)))
  }
  return cloudformation.createStack(params).promise()
}

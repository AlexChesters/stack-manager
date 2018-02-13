const AWS = require('aws-sdk')

const cloudformation = new AWS.CloudFormation({ region: 'eu-west-1' })

module.exports = ({ projectName, templatePath }) => {
  const segments = templatePath.split('infrastructure/stacks/')
  const params = {
    StackName: `${projectName}--${segments[segments.length - 1].replace(/\//g, '-').slice(0, -5)}`
  }
  return cloudformation.deleteStack(params).promise()
}

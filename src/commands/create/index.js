const path = require('path')

const chalk = require('chalk')
const AWS = require('aws-sdk')

const generateStackName = require('../../utils/generate-stack-name')

/**
 * Creates a Cloudformation stack
 * @function create
 * @memberof stack-manager
 * @param {String} templatePath The path to your Cloudformation template.
 * @param {String} [capability] Capability to specify when creating your stack.
 * Defaults to 'CAPABILITY_IAM'. All capabilities can be found
 * [here]{@link https://docs.aws.amazon.com/AWSCloudFormation/latest/APIReference/API_CreateStack.html}.
 * @param {String} [region] The region to create the Cloudformation stack in.
 * Defaults to eu-west-1.
 * @returns {Promise} Resolves when the stack enters the
 * [CREATE_COMPLETE]{@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-describing-stacks.html#w2ab2c15c15c17c11}
 * state.
 */
module.exports = (templatePath, capability, region = 'eu-west-1') => {
  const cloudformation = new AWS.CloudFormation({ region })
  const stackName = generateStackName(templatePath)
  const params = {
    StackName: stackName,
    Capabilities: [capability || 'CAPABILITY_IAM'],
    TemplateBody: JSON.stringify(require(path.join(process.cwd(), templatePath)))
  }
  return cloudformation
    .createStack(params)
    .promise()
    .then(() => {
      return cloudformation
        .waitFor('stackCreateComplete', { StackName: stackName })
        .promise()
        .then(() => (
          console.log(
            chalk.green('[SUCCESS]') +
            ' Stack ' +
            chalk.green(stackName) +
            ' created'
          )
        ))
    })
}

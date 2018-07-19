const path = require('path')
const chalk = require('chalk')

const AWS = require('aws-sdk')

const getParameters = require('../../utils/get-parameters')
const generateStackName = require('../../utils/generate-stack-name')

/**
 * Updates a Cloudformation stack
 * @function update
 * @memberof stack-manager
 * @param {String} templatePath The path to your Cloudformation template.
 * @param {String} [capability] Capability to specify when creating your stack.
 * Defaults to 'CAPABILITY_IAM'. All capabilities can be found
 * [here]{@link https://docs.aws.amazon.com/AWSCloudFormation/latest/APIReference/API_CreateStack.html}.
 * @param {String} [region] The region where the Cloudformation stack is.
 * Defaults to eu-west-1.
 * @returns {Promise} Resolves when the stack enters the
 * [UPDATE_COMPLETE]{@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-describing-stacks.html#w2ab2c15c15c17c11}
 * state.
 */
module.exports = (templatePath, capability, region = 'eu-west-1') => {
  const cloudformation = new AWS.CloudFormation({ region })
  const stackName = generateStackName(templatePath)
  const templateFp = path.join(process.cwd(), templatePath)
  const parameterFp = path.join(templateFp, '../../', 'parameters', path.basename(templateFp))
  const params = {
    StackName: stackName,
    Capabilities: [capability || 'CAPABILITY_IAM'],
    TemplateBody: JSON.stringify(require(path.join(process.cwd(), templatePath))),
    Parameters: getParameters(parameterFp)
  }
  return cloudformation
    .updateStack(params)
    .promise()
    .then(() => {
      return cloudformation
        .waitFor('stackUpdateComplete', { StackName: stackName })
        .promise()
        .then(() => (
          console.log(
            chalk.green('[SUCCESS]') +
            ' Stack ' +
            chalk.green(stackName) +
            ' updated'
          )
        ))
    })
}

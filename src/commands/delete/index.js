const AWS = require('aws-sdk')
const chalk = require('chalk')

const cloudformation = new AWS.CloudFormation({ region: 'eu-west-1' })

const generateStackName = require('../../utils/generate-stack-name')

/**
 * Deletes a Cloudformation stack
 * @function delete
 * @memberof stack-manager
 * @param {String} templatePath The path to your Cloudformation template.
 * @returns {Promise} Resolves when the stack enters the
 * [DELETE_COMPLETE]{@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-describing-stacks.html#w2ab2c15c15c17c11}
 * state.
 */
module.exports = (templatePath) => {
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
        .then(() => (
          console.log(
            chalk.green('[SUCCESS]') +
            ' Stack ' +
            chalk.green(stackName) +
            ' deleted'
          )
        ))
    })
}

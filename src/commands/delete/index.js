const AWS = require('aws-sdk')

const cloudformation = new AWS.CloudFormation({ region: 'eu-west-1' })

const generateStackName = require('../../utils/generate-stack-name')

/**
 * Deletes a Cloudformation stack
 * @function delete
 * @memberof stack-manager
 * @param {String} templatePath the path to your Cloudformation template.
 * @param {String} [capability] capability to specify when creating your stack.
 * Defaults to 'CAPABILITY_IAM'. All capabilities can be found
 * [here]{@link https://docs.aws.amazon.com/AWSCloudFormation/latest/APIReference/API_CreateStack.html}.
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
        .then(() => console.log(`Stack ${stackName} deleted`))
    })
}

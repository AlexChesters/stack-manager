const path = require('path')

const AWS = require('aws-sdk')

const generateStackName = require('../../utils/generate-stack-name')

const cloudformation = new AWS.CloudFormation({ region: 'eu-west-1' })

/**
 * Updates a Cloudformation stack
 * @function update
 * @memberof stack-manager
 * @param {String} templatePath the path to your Cloudformation template.
 * @param {String} [capability] capability to specify when creating your stack.
 * Defaults to 'CAPABILITY_IAM'. All capabilities can be found
 * [here]{@link https://docs.aws.amazon.com/AWSCloudFormation/latest/APIReference/API_CreateStack.html}.
 * @returns {Promise} Resolves when the stack enters the
 * [UPDATE_COMPLETE]{@link https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-describing-stacks.html#w2ab2c15c15c17c11}
 * state.
 */
module.exports = (templatePath, capability) => {
  const stackName = generateStackName(templatePath)
  const params = {
    StackName: stackName,
    Capabilities: [capability || 'CAPABILITY_IAM'],
    TemplateBody: JSON.stringify(require(path.join(process.cwd(), templatePath)))
  }
  return cloudformation
    .updateStack(params)
    .promise()
    .then(() => {
      return cloudformation
        .waitFor('stackUpdateComplete', { StackName: stackName })
        .promise()
        .then(() => console.log(`Stack ${stackName} updated`))
    })
}

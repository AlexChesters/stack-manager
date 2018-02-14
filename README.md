# stack-manager
Manage your AWS Cloudformation stacks a bit easier

# Disclaimer
`stack-manager` is very opinionated, it probably insists on certain
things which you may not like. It's quite possible this tool isn't for
you. If it is, however, great! :)

Here are some things `stack-manager` assumes about your project:
* You have a `package.json` file in the root of your project with a
`name` field and you would like to prefix your stack definitions with
this name
* Your templates are stored in a directory called
`infrastructure/stacks`
  * They can be nested at any level below this
* Any CLI commands are ran from the root of your project

# Installation
`npm install stack-manager --save-dev`

# Usage
`stack-manager` has both a command-line and JavaScript interface.

### CLI
`stack-manager --help`

### JavaScript
See the [documentation](https://alexchesters.github.io/stack-…).

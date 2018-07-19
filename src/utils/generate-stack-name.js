module.exports = (templatePath) => {
  const segments = templatePath.split('infrastructure/stacks/templates/')
  const path = segments[segments.length - 1].replace(/\//g, '-').slice(0, -5)
  return `${require(`${process.cwd()}/package.json`).name}--${path}`
}

module.exports = (projectName, templatePath) => {
  const segments = templatePath.split('infrastructure/stacks/')
  const path = segments[segments.length - 1].replace(/\//g, '-').slice(0, -5)
  return `${projectName}--${path}`
}

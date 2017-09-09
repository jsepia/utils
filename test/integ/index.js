const nodeVersion = require('node-version')

if (nodeVersion) {
  const majorVersion = parseInt(nodeVersion.major)
  if (majorVersion > 7) {
    require('./import')
  }
  else {
    require('./require')
  }
}

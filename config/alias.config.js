const path = require('path');
const paths = require('./paths')

module.exports = {
  '@graphql': path.resolve(paths.appSrc, 'graphql'),
  '@components': path.resolve(paths.appSrc, 'components'),
  '@containers': path.resolve(paths.appSrc, 'containers'),
  '@redux': path.resolve(paths.appSrc, 'redux'),
  '@actions': path.resolve(paths.appSrc, 'redux/actions'),
  '@map': path.resolve(paths.appSrc, 'redux/map'),
  // '@font': path.resolve(paths.appSrc, 'static/font'),
  '@image': path.resolve(paths.appSrc, 'assets/image'),
  // '@style': path.resolve(paths.appSrc, 'static/style'),
  '@utils': path.resolve(paths.appSrc, 'utils'),
  // '@lessStyle': path.resolve(paths.appSrc, 'static/less'),
  '@router': path.resolve(paths.appSrc, 'router'),
}

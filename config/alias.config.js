
const path = require('path');

module.exports = {
  // Support React Native Web
  // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
  'react-native': 'react-native-web',
  '@graphql': path.resolve(__dirname, '../src/graphql'),
  '@components': path.resolve(__dirname, '../src/components'),
  '@pages': path.resolve(__dirname, '../src/pages'),
  '@redux': path.resolve(__dirname, '../src/redux'),
  '@actions': path.resolve(__dirname, '../src/redux/actions'),
  '@map': path.resolve(__dirname, '../src/redux/map'),
  // '@font': path.resolve(__dirname, '../src/static/font'),
  '@image': path.resolve(__dirname, '../src/assets/image'),
  // '@style': path.resolve(__dirname, '../src/static/style'),
  '@utils': path.resolve(__dirname, '../src/utils'),
  // '@lessStyle': path.resolve(__dirname, '../src/static/less'),
  '@router': path.resolve(__dirname, '../src/router'),
}

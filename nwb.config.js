module.exports = {
  type: 'web-module',
  module: {
    rules: [{
      'sass-css': {
        modules: true,
        localIdentName: '[hash:base64:5]'
      }
    }]
  },
  karma: {
    browsers: ["ChromeHeadless"]
  },
  npm: {
    esModules: true,
    umd: {
      global: 'ck',
      externals: {}
    }
  }
}

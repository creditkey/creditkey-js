const path = require('path');

const nodeModulesPath = path.resolve('./node_modules');

module.exports = {
  type: 'web-module',
  webpack: {
    extractCSS: false,
    rules: {
      'sass': {
        loader: 'sass-loader',
        options: {
          includePaths: [nodeModulesPath]
        }
      }
    }
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

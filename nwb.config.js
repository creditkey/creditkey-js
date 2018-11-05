module.exports = {
  type: 'web-module',
  module: {
    rules: [{
      test: /\.css$/,
      use: ['style-loader', 'css-loader']
    }]
  },
  npm: {
    esModules: true,
    umd: {
      global: 'ck',
      externals: {}
    }
  }
}

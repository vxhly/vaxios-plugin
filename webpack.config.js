const path = require('path')
module.exports = {
  entry: path.join(__dirname, './src/vaxios-plugin.js'),
  output: {
    path: path.join(__dirname, './dist')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
}
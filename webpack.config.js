var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: {
    main: [
      'webpack-dev-server/client?http://0.0.0.0:8100',
      'webpack/hot/dev-server',
      './src/index'
    ]
  },
  output: {
    path: path.join(__dirname, 'www'),
    filename: 'bundle.js',
    publicPath: 'www/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    noParse: /node_modules\/json-schema\/lib\/validate\.js/,
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        include: path.join(__dirname, 'src')
      },
      {
        test: /\.(css|scss)$/,
        loader: 'style!css!sass'
      },
      {
        test: /\.(png|woff|ttf|eot|svg)$/,
        loader: 'url-loader?limit=100000'
      }
    ]
  },
  externals: {
    'showdown': 'window.Showdown'
  }
};
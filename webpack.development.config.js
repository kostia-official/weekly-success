var config = require('./webpack.config.js');
var webpack = require('webpack');

config.plugins.push(
  new webpack.DefinePlugin({
    "process.env": {
      "NODE_ENV": JSON.stringify("development"),
      "URL": JSON.stringify("http://localhost:5000")
    }
  })
);

module.exports = config;
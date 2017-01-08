//Config Examples: https://webpack.github.io/docs/examples.html
var path = require('path');
var webpack = require('webpack');

module.exports = [{
  name: "Browser",
  target: "web",

  entry: "./src/index",

  output: {
    path: path.join(__dirname, "dist"),
    filename: "big.js",
    library: "Big",
    libraryTarget: "umd"
  },

  devtool: 'source-map',

  resolve: {
    root: [
      path.resolve('.')
    ],
    extensions: [
      '.ts', '.js', '.tsx', '.jsx', ''
    ]
  },

  module: {
    loaders: [{
      test: /\.tsx?$/,
      exclude: /node_modules/,
      loaders: ['babel-loader', 'ts-loader']
    }, {
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }]
  },

  plugins: [
    //new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin()
  ],

  //Options for ts-loader
  ts: {
    compilerOptions: {
      "declaration": false
    }
  }
}];

//Config Examples: https://webpack.github.io/docs/examples.html
var path = require('path');
var webpack = require('webpack');

module.exports = [{
  name: "Browser",
  target: "web",

  entry: "./src/index",

  output: {
    path: path.join(__dirname, "dist"),
    filename: "bignum.js",
    library: "BigNum",
    libraryTarget: "umd"
  },

  resolve: {
    root: [
      path.resolve('.')
    ],
    extensions: [
      "", ".webpack.js", ".web.js", ".js", ".ts", ".tsx", ".d.ts"
    ]
  },

  module: {
    loaders: [{
      test: /\.tsx?$/,
      loaders: ['babel', 'ts-loader']
    }, {
      test: /\.jsx?$/,
      loader: 'babel',
      exclude: /node_modules/
    }]
  },

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin()/*,
    new webpack.optimize.UglifyJsPlugin()*/
  ],

  //Options for ts-loader
  ts: {
    compilerOptions: {
      "declaration": false
    }
  }
}];

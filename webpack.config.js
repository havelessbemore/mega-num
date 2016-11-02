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
    modulesDirectories: [
      "node_modules"
    ],
    extensions: [
      "", ".webpack.js", ".web.js", ".js", ".ts", ".tsx", ".d.ts"
    ]
  },

  module: {
    noParse: [
      /node_modules\/json-schema\/lib\/validate\.js/
    ],
    loaders: [{
      test: /\.tsx?$/,
      loaders: ['babel', 'ts-loader']
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }, {
      test: /\.md$/,
      loader: 'html!markdown'
    }, {
      test: /\.jsx?$/,
      loader: 'babel',
      exclude: /node_modules/
    }]
  },

  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  ],

  //Options for ts-loader
  ts: {
    compilerOptions: {
      "declaration": false
    }
  },

  /*
  node: {
    console: false,
    global: true,
    process: true,
    Buffer: true,
    __filename: 'mock',
    __dirname: 'mock',
    net: 'empty',
    tls: 'empty',
    fs: 'empty'
  }
  */
}];

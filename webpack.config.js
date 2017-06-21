//Config Examples: https://webpack.github.io/docs/examples.html
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.ts',
  externals: {},
  // devtool: 'source-map',
  module: {
    rules: [{
      test: /\.jsx?$/,
      loaders: ['babel-loader'],
      exclude: /node_modules/
    }, {
      test: /\.tsx?$/,
      exclude: /node_modules/,
      loaders: ['babel-loader', 'ts-loader']
    }]
  },
  node: {
    Buffer: true,
    console: true,
    fs: 'empty',
    global: true,
    net: 'empty',
    process: true,
    tls: 'empty'
  },
  output: {
    filename: 'big.min.js',
    library: 'Big',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false
    })
  ],
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [path.join(__dirname, 'src'), 'node_modules']
  },
  target: 'web'
};

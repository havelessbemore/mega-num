//Config Examples: https://webpack.github.io/docs/examples.html
const path = require('path');
const webpack = require('webpack');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: './src/index.ts',

  externals: {},

  devtool: 'source-map',

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
    filename: 'mega-num.min.js',
    library: 'MegaNum',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, 'dist')
  },

  plugins: [
    new webpack.LoaderOptionsPlugin({
      debug: false,
      minimize: true
    }),
    new UglifyJsPlugin({
      extractComments: true,
      sourceMap: true
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      defaultSizes: 'parsed',
      openAnalyzer: false,
      reportFilename: '../webpack_bundle_analyzer_report.html'
    })
  ],

  resolve: {
    extensions: ['.tsx', '.ts', '.json', '.js'],
    modules: [path.join(__dirname, 'src'), 'node_modules']
  },

  target: 'web'
};

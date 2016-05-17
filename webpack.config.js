var path = require('path');
var webpack = require('webpack');
var HTMLWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');
var precss = require('precss');

module.exports = {
  devtool: 'cheap-module-source-map',
  entry: [
    './src/index',
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: './static/bundle.min.js',
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        beautify: true,
        warnings: false,
      },
    }),
    new HTMLWebpackPlugin({
      hash: true,
      inject: 'body',
      template: './index.html',
    }),
    new ExtractTextPlugin('./static/style.css', {
      allChunks: true,
    }),
    new webpack.ProvidePlugin({
      Promise: 'exports?global.Promise!es6-promise',
      fetch: 'exports?global.fetch!whatwg-fetch',
    }),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel',
        include: path.join(__dirname, 'src'),
      },
      {
        test: /\.css$/,
        include: /components/,
        loaders: [
          'style-loader',
          'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]',
          'postcss-loader',
        ],
      },
      {
        test: /\.css$/,
        exclude: /components/,
        loader: 'style!css!postcss',
      },
      {
        test: /\.json$/,
        loader: 'json',
      },
    ],
  },
  postcss() {
    return [autoprefixer, precss];
  },
};

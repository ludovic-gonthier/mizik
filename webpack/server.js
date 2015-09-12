import webpack from 'webpack';
import { resolve } from 'path';
import { readdirSync } from 'fs';
import HtmlWebpackPlugin from 'html-webpack-plugin';

import config from '../config';

var modules = {};

readdirSync('node_modules')
  .filter(x => ['.bin'].indexOf(x) === -1)
  .forEach(module => modules[module] = 'commonjs ' + module);

module.exports = {
  entry: {
    application: config.get('project.server.entry'),
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['babel-loader?optional[]=runtime&stage=0'],
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3|\.ogg$/,
        loader: 'file',
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules',
      },
    ],
  },
  output: {
    path: config.get('project.server.output'),
    filename: '[name].js',
  },
  plugins: [
    new webpack.DefinePlugin({
      __SERVER__ : true
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
  ],
  externals: modules,
  resolve: {
    root: config.get('root.path'),
    extensions: ['', '.js', '.jsx'],
    alias: [
      'actions',
      'assets',
      'components',
      'controllers',
      'reducers',
      'stores',
      'views',
    ],
    modulesDirectories: ['node_modules', 'src'],
  },
  target: 'node',
};

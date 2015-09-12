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
    main: config.get('project.client.entry'),
  },
  devtool: 'eval',
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['react-hot-loader', 'babel?optional[]=runtime'],
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3|\.ogg$/,
        loader: 'file',
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader?modules',
      },
    ],
  },
  output: {
    path: config.get('project.client.output'),
    filename: '[name].js',
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
  ],
  // externals: modules,
  resolve: {
    root: config.get('root.path'),
    extensions: ['', '.js', '.jsx'],
    alias: [
      'actions',
      'containers',
      'components',
      'assets',
      'reducers',
      'stores',
      'views',
    ],
    modulesDirectories: ['node_modules', 'src'],
  },
  target: 'web',
};

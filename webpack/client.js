import webpack from 'webpack';
import { resolve } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const ROOT = resolve(__dirname, '..');

module.exports = {
  debug: true,
  devServer: {
    contentBase: resolve(ROOT, 'build'),
  },
  devtool: 'eval',
  entry: {
    application: resolve(ROOT, 'src', 'module.js'),
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        include: resolve(ROOT, 'src'),
        loaders: ['babel?optional[]=runtime'],
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
    path: resolve(ROOT, 'build'),
    filename: '[name].js',
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      inject: 'body',
      template: resolve(ROOT, 'src', 'views', 'index.html'),
    }),
  ],
  resolve: {
    root: resolve(ROOT, 'src'),
    extensions: ['', '.js', '.jsx'],
    alias: [
      'actions',
      'components',
      'assets',
      'reducers',
      'stores',
      'views',
    ],
  },
  target: 'web',
};

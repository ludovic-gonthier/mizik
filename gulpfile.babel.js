import del from 'del';
import eslint from 'gulp-eslint';
import gulp from 'gulp';
import nodemon from 'gulp-nodemon';
import util from 'gulp-util';
import webpack from 'webpack';
import webpackDevServer from 'webpack-dev-server';

import webpackConfig from './webpack.config';
import config from './config';

const files = [
  'src/**/*.{js,jsx}',
  'webpack/*.js',
  'config/*.js',
  'gulpfile.babel.js',
];

gulp.task('lint', () => {
  return gulp.src(files)
    .pipe(eslint())
    .pipe(eslint.formatEach())
    .pipe(eslint.failAfterError());
});
gulp.task('lint:watch', () => {
  return gulp.watch(files, ['lint']);
});

gulp.task('webpack:build', (end) => {
  const plugins = [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      output : {
        'comments'  : false
      },
      compress : {
        'unused'    : true,
        'dead_code' : true
      }
    }),
  ];
  let config = Object.assign([], webpackConfig);

  config = config.map((item) => Object.assign({}, item, {plugins: plugins.concat(item.plugins)}));

  webpack(config).run(function(error, stats) {
    if (error) {
      throw new util.PluginError("webpack:build", error);
    }

    util.log("[webpack:build]", stats.toString({
      colors: true
    }));

    end();
  });
});
gulp.task('webpack:build:dev', (end) => {
  let options = Object.assign([], webpackConfig);
  let compiled = false;

  options.debug = true;
  options.watch = true;
  options.preLoaders = [
    {
      test : /\.(js|jsx)$/,
      loaders : ['eslint-loader'],
      include : config.get('project.path')
    }
  ];

  return webpack(options, function(error, stats) {
    if (error) {
      throw new util.PluginError("webpack:build", error);
    }

    util.log("[webpack:build]", stats.toString({
      colors: true
    }));

    if (!compiled) {
      end();
    }

    compiled = true;
  });
});
gulp.task('clean', () => {
  del(['build/**']);
});

gulp.task('deploy', ['clean', 'webpack:build', 'server']);
gulp.task('dev', ['clean', 'server']);

gulp.task('server', ['webpack:build:dev'], () => {
  nodemon({
    script: config.get('nodemon.script'),
  });
});

gulp.task('test', () => {});

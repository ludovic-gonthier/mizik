'use strict';

var gulp = require('gulp');
var gutil = require('gulp-util');
var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");

var config = require('./webpack.config.js');

gulp.task('default', ['webpack-dev-server', 'webpack:watch'])
gulp.task("webpack:watch", ["webpack:build-dev"], function() {
  gulp.watch(["{src,webpack}/**/*"], ["webpack:build-dev"]);
});

gulp.task("build", ["webpack:build"]);

gulp.task("webpack:build", function(callback) {
  // run webpack
  webpack(Object.assign(config, {
    debug: false,
    devtool: 'eval',
    plugin: (config.pulgins || []).concat([
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin(),
      new webpack.DefinePlugin({
        "process.env": {
          // This has effect on the react lib size
          "NODE_ENV": JSON.stringify("production")
        }
      })
    ])
  })).run(function(error, stats) {
    if (error) {
      throw new gutil.PluginError("webpack", error);
    }

    gutil.log("[webpack]", stats.toString({
      colors: true
    }));
    callback();
  });
});

gulp.task("webpack:build-dev", function(callback) {
  // run webpack
  webpack(Object.assign(config, {
    debug: true,
    devtool: 'sourcemap'
  })).run(function(error, stats) {
    if(error) {
      throw new gutil.PluginError("webpack:build-dev", error);
    }

    gutil.log("[webpack:build-dev]", stats.toString({
      colors: true
    }));
    callback();
  });
});

gulp.task("webpack-dev-server", function(callback) {
  console.log(config[0].output.publicPath);
  // Start a webpack-dev-server
  new WebpackDevServer(webpack(Object.assign(config, {
    entry: [
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      './src/module'
    ],
    debug: true,
    devtool: 'eval',
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  })), {
    stats: {
      colors: true
    },
    hot: true
  }).listen(8080, "localhost", function(error, stats) {
    if (error) {
      throw new gutil.PluginError("webpack-dev-server", error);
    }

    // Server listening
    gutil.log("[webpack-dev-server]", "http://localhost:8080/");

    // keep the server alive or continue?
    // callback();
  });
});

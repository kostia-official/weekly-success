var gulp = require("gulp");
var gutil = require("gulp-util");
var replace = require('gulp-replace');
var rename = require('gulp-rename');
var sh = require('shelljs');
var runSequence = require('run-sequence');

var webpack = require("webpack");
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./webpack.config.js");
var ip = require('ip');

// The development server (the recommended option for development)
gulp.task("default", ["webpack-dev-server"]);

// Build and watch cycle (another option for development)
// Advantage: No server required, can run app from filesystem
// Disadvantage: Requests are not blocked until bundle is available,
//               can serve an old app on refresh
gulp.task("build-dev", ["webpack:build-dev"], function () {
  gulp.watch(["./src/**/*"], ["webpack:build-dev"]);
});

// Production build
gulp.task("build", ["webpack:build"]);

gulp.task("webpack:build", function (callback) {
  // modify some webpack config options
  var myConfig = Object.create(webpackConfig);
  myConfig.plugins = myConfig.plugins.concat(
    new webpack.DefinePlugin({
      "process.env": {
        // This has effect on the react lib size
        "NODE_ENV": JSON.stringify("production")
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin()
  );

  // run webpack
  webpack(myConfig, function (err, stats) {
    if (err) throw new gutil.PluginError("webpack:build", err);
    gutil.log("[webpack:build]", stats.toString({
      colors: true
    }));
    callback();
  });
});

// modify some webpack config options
var myDevConfig = Object.create(webpackConfig);
myDevConfig.devtool = "sourcemap";
myDevConfig.debug = true;

// create a single instance of the compiler to allow caching
var devCompiler = webpack(myDevConfig);

gulp.task("webpack:build-dev", function (callback) {
  // run webpack
  devCompiler.run(function (err, stats) {
    if (err) throw new gutil.PluginError("webpack:build-dev", err);
    gutil.log("[webpack:build-dev]", stats.toString({
      colors: true
    }));
    callback();
  });
});

gulp.task("webpack-dev-server", function (callback) {
  // modify some webpack config options
  var myConfig = Object.create(webpackConfig);
  myConfig.devtool = "eval";
  myConfig.debug = true;

  // Start a webpack-dev-server
  new WebpackDevServer(webpack(myConfig), {
    publicPath: "/" + myConfig.output.publicPath,
    hot: true,
    stats: {
      colors: true
    }
  }).listen(8100, "0.0.0.0", function (err) {
    if (err) throw new gutil.PluginError("webpack-dev-server", err);
    gutil.log("[webpack-dev-server]", "http://localhost:8100/webpack-dev-server/index.html");
  });
});

gulp.task('device:serve', function (done) {
  runSequence(['webpack-dev-server', 'device:run'], done);
});

gulp.task('device:run', function (done) {
  gulp.src('config.xml.template')
    .pipe(replace('%SRC%', `http://${ip.address()}:8100`))
    .pipe(rename('config.xml'))
    .pipe(gulp.dest('./'))
    .on('end', function () {
      sh.exec('cordova run');
      done();
    });
});

gulp.task('device:run:release', ['webpack:build'], function (done) {
  gulp.src('config.xml.template')
    .pipe(replace('%SRC%', `index.html`))
    .pipe(rename('config.xml'))
    .pipe(gulp.dest('./'))
    .on('end', function () {
      sh.exec('cordova run');
      done();
    });
});
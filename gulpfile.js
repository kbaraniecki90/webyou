const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

gutil = require('gulp-util'),
webpack = require('webpack');
const path = require('path'); //

const reload = browserSync.reload;
const srcFiles = './wp-content/themes/webyou';

gulp.task('browser-sync', () => {
  browserSync.init({
    injectChanges: true,
    proxy: 'http://localhost/webyou/'
  });
});

gulp.task('watch', () => {
  gulp.watch([srcFiles+'/**/*.php']).on("change", reload);
  gulp.watch([srcFiles+'/src/scss/*.scss'], gulp.series('sass'));
  gulp.watch(srcFiles+'/**/*.js').on("change", reload);
});

gulp.task('sass', function() {
  return gulp.src(srcFiles+'/src/scss/main.scss')
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(srcFiles+'/dist/'))
    .pipe(browserSync.stream())
    done();
});

//  ###############################
//  Webpack
//  ###############################
gulp.task('webpack', function(done) {
  webpack({
    entry: srcFiles+'/src/js/main.js',
    output: {
      path: __dirname + '/dist',
      filename: 'bundle.js'
    },
    module: {
      loaders: [
        {
          test: /\.js?$/,
          loader: 'babel',
          exclude: /node_modules/
        }
      ]
    }
  }, function(error) {
    var pluginError;

    if (error) {
      pluginError = new gulpUtil.PluginError('webpack', error);

      if (done) {
        done(pluginError);
      } else {
        gulpUtil.log('[webpack]', pluginError);
      }

      return;
    }

    if (done) {
      done();
    }
  });
});


gulp.task('default', gulp.parallel(
    'sass',
    'watch',
    'browser-sync',
    'webpack'
  )
);

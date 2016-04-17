var gulp = require('gulp');
var del = require('del');
var sass = require('gulp-sass');
var runSequence = require('run-sequence');
var assign = require('lodash.assign');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var webserver = require('gulp-webserver');
var ngAnnotate = require('gulp-ng-annotate');

var paths = {
  build: {
    base: './build',
    client: './build/app'
  },
  html: {
    base: './client/**/*.html',
    build: './build/app'
  },
  css: {
    base: './client/styles/*.scss',
    watch: './client/styles/*.scss',
    build: './build/app/css'
  },
  js: {
    base: './client/index.js',
    build: 'main.js'
  }
};

gulp.task('md:css', [], function () {
  gulp.src('./node_modules/angular-material/angular-material.min.css')
    .pipe(gulp.dest(paths.css.build));
});

gulp.task('md', ['md:css'], function () {});

gulp.task('clean', function () {
  return del([paths.build.base]);
});

gulp.task('html', [], function () {
    return gulp.src(paths.html.base)
        .pipe(gulp.dest(paths.html.build));
});

gulp.task('html:watch', ['html'], function () {
    return gulp.watch(paths.html.base, ['html']);
});

gulp.task('css', [], function () {
  return gulp.src(paths.css.base)
    .pipe(sass())//.on('error', sass.logError))
    .pipe(gulp.dest(paths.css.build));//'./build/app/css'));
});

gulp.task('css:watch', function () {
  gulp.watch(paths.css.watch, ['sass']);
});

// browserify
var customOpts = {
  entries: [paths.js.base],
  debug: true
};
var b = browserify(customOpts);

// watchify
var opts = assign({}, watchify.args, customOpts);
var w = watchify(browserify(opts));

function bundle(bundler) {
    return bundler.transform('babelify', {presets: ['es2015']})
      .bundle()
      .pipe(source(paths.js.build))
      .pipe(ngAnnotate())
      .pipe(gulp.dest(paths.build.client));
};

gulp.task('js', [], function () {
  return bundle(b);
});

gulp.task('js:watch', [], function () {
  w.on('update', function () {
    console.log('rebuilding bundle');
    bundle(w);
  });
  return bundle(w);
});

gulp.task('webserver', [], function () {
  gulp.src(paths.build.client)
    .pipe(webserver({
      host: 'localhost',
      port: 8000,
      livereload: true,
      open: true,
      fallback: 'index.html'
    }));
});

// gulp.task('build', [], function (callback) {
//     runSequence('clean', ['md', 'js', 'html', 'css'], callback);
// });

gulp.task('build', [], function (callback) {
    runSequence(['md', 'js', 'html', 'css'], callback);
});

gulp.task('dev', [], function (callback) {
  runSequence(['build', 'webserver'], ['js:watch', 'html:watch', 'css:watch'], callback);
});

gulp.task('default', ['dev']);

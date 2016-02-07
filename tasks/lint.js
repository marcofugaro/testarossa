module.exports = function(config) { 

    'use strict';

    var gulp = require('gulp');
    var eslint = require('gulp-eslint');

    gulp.task('lint', function() {
      return gulp.src(config.scripts.src)
        .pipe(eslint()) 
        .pipe(eslint.format()) 
        .on('error', notify.onError('<%= error.message %>')) //TODO test it https://github.com/spalger/gulp-jshint/issues/91
        .pipe(gulpif(config.autoreload, browserSync.stream()));
    });
}
module.exports = function(config) { 

    'use strict';

    var gulp = require('gulp');
    var jshint = require('gulp-jshint'); //todo check out http://eslint.org/

    gulp.task('lint', function() {
      return gulp.src([config.scripts.src, '!app/js/templates.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish')); //TODO add notify on fail reporter and test it https://github.com/spalger/gulp-jshint/issues/91
    });
}
module.exports = function(config) { 

    'use strict';
    
    var gulp = require('gulp');
    var gulpif = require('gulp-if');
    var changed = require('gulp-changed');
    var browserSync = require('browser-sync');

    gulp.task('fonts', function() {

      return gulp.src(config.fonts.src)
        .pipe(changed(config.fonts.dest))
        .pipe(gulp.dest(config.fonts.dest))
        .pipe(gulpif(config.autoreload, browserSync.stream()));
    });
}
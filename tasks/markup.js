module.exports = function(config) { 

    'use strict';
    
    var gulp = require('gulp');
    var gulpif = require('gulp-if');
    var changed = require('gulp-changed');
    var browserSync = require('browser-sync');

    gulp.task('markup', function() {

      return gulp.src(config.markup.src, { base: config.sourceDir })
        .pipe(changed(config.markup.dest))
        .pipe(gulp.dest(config.markup.dest))
        .pipe(gulpif(config.autoreload, browserSync.stream()));
    });
}
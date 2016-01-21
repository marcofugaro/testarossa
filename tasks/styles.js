module.exports = function(config) { 

    'use strict';

    var gulp = require('gulp');
    var gulpif = require('gulp-if');
    var sourcemaps = require('gulp-sourcemaps');
    var sassGlob = require('gulp-sass-glob');
    var sass = require('gulp-sass');
    var notify = require('gulp-notify');
    var remane = require('gulp-rename');
    var browserSync = require('browser-sync');
    var autoprefixer = require('gulp-autoprefixer');

    gulp.task('styles', function () {

        return gulp.src(config.styles.src)
            .pipe(gulpif(config.styles.sourcemaps, sourcemaps.init()))
            .pipe(sassGlob())
            .pipe(sass({ outputStyle: 'compressed' })).on('error', notify.onError('<%= error.message %>')))
            .pipe(autoprefixer('last 2 versions', '> 1%', 'ie 9'))
            .pipe(rename({ suffix: '.min' }))
            .pipe(gulpif(config.styles.sourcemaps, sourcemaps.write()))
            .pipe(gulp.dest(config.styles.dest))
            .pipe(gulpif(config.browserSync.autoreload, browserSync.stream()));
    });
}
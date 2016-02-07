module.exports = function(config) { 
    
    'use strict';

    var gulp = require('gulp');
    var changed = require('gulp-changed');
    var gulpif = require('gulp-if');
    var imagemin = require('gulp-imagemin');
    var pngquant = require('imagemin-pngquant');
    var browserSync = require('browser-sync');

    gulp.task('images', function() {

        return gulp.src(config.images.src, { base: config.sourceDir })
            .pipe(changed(config.images.dest))
            .pipe(gulpif(global.isProduction, imagemin({ 
                use: [pngquant()],  // TODO test this or the default png optimizer, and ADD svg optimizer
                progressive: true,
                interlaced: true
            })))
            .pipe(gulp.dest(config.images.dest))
            .pipe(gulpif(config.autoreload, browserSync.stream()));
    });
}
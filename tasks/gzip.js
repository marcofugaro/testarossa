module.exports = function(config) { 

    'use strict';

    var gulp = require('gulp');
    var gzip = require('gulp-gzip');

    gulp.task('gzip', function() {

        if(!config.gzip) return;

        return gulp.src(config.buildDir + '**/*.{html,php,xml,json,css,js,js.map,css.map}')
            .pipe(gzip())
            .pipe(gulp.dest(config.buildDir));
    });
}
module.exports = function(config) { 

    'use strict';

    var gulp = require('gulp');
    var modernizr = require('gulp-modernizr');
    var concat = require('gulp-concat');
    var uglify = require('gulp-uglify');
    var addsrc = require('gulp-add-src');

    gulp.task('modernizr', function() { 

        if(!config.modernizr) return;

        return gulp.src([config.styles.src, config.scripts.src])  
            .pipe(modernizr({
                options:  ['setClasses', 'addTest', 'testProp', 'fnBind']
            }))
            .pipe(uglify())
            .pipe(addsrc.append(config.browserify.dest))
            .pipe(concat(config.browserify.bundleName))
            .pipe(gulp.dest(config.scripts.dest));  
    });
}
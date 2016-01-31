module.exports = function(config) { 

    'use strict';

    var gulp = require('gulp');
    var modernizr = require('gulp-modernizr');
    var concat = require('gulp-concat');
    var uglify = require('gulp-uglify');
    var addsrc = require('gulp-add-src');

    gulp.task('modernizr', function() { 

        if(!config.modernizr.enable) return;

        return gulp.src(config.modernizr.looking)  
            .pipe(modernizr({
                options:  ['setClasses', 'addTest', 'testProp', 'fnBind']
            }))
            .pipe(uglify())
            .pipe(addsrc.append(config.scripts.dest + '/main.min.js'))
            .pipe(concat('main.min.js'))
            .pipe(gulp.dest(config.scripts.dest));  
    });
}
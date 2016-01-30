module.exports = function(config) { 

    'use strict';

    var gulp = require('gulp');
    var modernizr = require('gulp-modernizr');

    gulp.task('modernizr', function() { 
        return gulp.src(config.modernizr.looking)  
            .pipe(modernizr({
                options:  ['setClasses', 'addTest', 'testProp', 'fnBind']
            }))
            .pipe(gulp.dest(config.scripts.dest));  
    });
}
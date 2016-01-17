module.exports = function(config) { 
    
    'use strict';

    var gulp = require('gulp');
    var del = require('del');

    gulp.task('clean', function() {
        return del([config.buildDir]);
    });
}
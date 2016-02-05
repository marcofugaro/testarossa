module.exports = function(config) { 

    'use strict';

    var gulp = require('gulp');
    var runSequence = require('run-sequence');

    gulp.task('dev', ['clean'], function(cb) {

        global.isProduction = false;

        runSequence(['markup', 'styles', 'browserify', 'images', 'fonts'], 'watch', cb);
        
    });
}
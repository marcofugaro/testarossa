module.exports = function(config) { 

    'use strict';

    var gulp = require('gulp');
    var runSequence = require('run-sequence');

    gulp.task('build', ['clean'], function(cb) {
      
        global.isProduction = true;

        runSequence(['styles', 'images', 'fonts', 'browserify'], 'modernizr', 'gzip', cb);
        
    });
}
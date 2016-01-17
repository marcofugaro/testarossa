module.exports = function(config) { 

    'use strict';

    var gulp = require('gulp');
    var runSequence = require('run-sequence');

    gulp.task('build', ['clean'], function(cb) {
      
        // cb = cb || function() {};

        global.isProduction = true;

        // runSequence(['styles', 'images', 'fonts', 'browserify'], 'gzip', cb);
        return runSequence(['styles', 'images', 'fonts', 'browserify'], 'gzip'); //TODO check if this shit works with deployment
    });
}
module.exports = function(config) { 

    'use strict';

    var gulp = require('gulp');
    var runSequence = require('run-sequence');

    gulp.task('dev', ['clean'], function(cb) {

        global.isProduction = false;

        // runSequence(['styles', 'images', 'fonts', 'browserify'], 'watch', cb);
        return runSequence(['styles', 'images', 'fonts', 'browserify'], 'watch'); //TODO check if this shit works
    });
}
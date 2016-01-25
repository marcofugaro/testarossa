module.exports = function(config) { 

    'use strict';

    var gulp = require('gulp');
    var runSequence = require('run-sequence');

    gulp.task('test', ['browser-sync'], function() {

        return runSequence('unit', 'protractor');

    });
}
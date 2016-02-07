module.exports = function(config) {

    'use strict';

    var gulp = require('gulp');
    var runSequence = require('run-sequence');

    gulp.task('deploy', ['build'], function(cb) {

        runSequence('upload', 'pagespeed', cb);

    });
}
module.exports = function(config) { 

    'use strict';

    var gulp = require('gulp');

    gulp.task('watch', ['browser-sync'], function() {

        // Scripts are automatically watched and rebundled by Watchify inside Browserify task
        gulp.watch(config.scripts.src, ['lint']);
        gulp.watch(config.styles.src,  ['styles']);
        gulp.watch(config.images.src,  ['images']);
        gulp.watch(config.fonts.src,   ['fonts']);
    });
}
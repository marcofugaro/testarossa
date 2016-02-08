module.exports = function(config) { 

    'use strict';

    var gulp = require('gulp');
    var pagespeed = require('psi').output;

    gulp.task('pagespeed', function() {

        if(!config.pagespeed) return;

        return pagespeed(config.domain, {
            strategy: 'mobile'
        });
    });
}
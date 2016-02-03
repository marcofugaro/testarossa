module.exports = function(config) { 
    
    'use strict';

    var gulp = require('gulp');
    var browserSync = require('browser-sync');
    var connect = require('gulp-connect-php');

    gulp.task('browser-sync', function() {
        
        connect.server({ 
                base: config.buildDir,
                stdio: 'ignore'
            }, function () {
            browserSync({
                proxy: '127.0.0.1:3000'
                // logLevel: 'silent', 
                // logConnections: false,
                // notify: false
            });
        });

        //TODO test this if better in bs.stream()
        // if(!config.autoreload) return;

        // gulp.watch(['public/**/*.{php,html,js,css}']).on('change', function () {
        //     browserSync.reload();
        // });
    });
}
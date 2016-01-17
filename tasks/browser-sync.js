module.exports = function(config) { 
    
    'use strict';

    var gulp = require('gulp');
    var browserSync = require('browser-sync');

    gulp.task('browser-sync', function() {
        
        connect.server({ 
                base: config.buildDir,
                stdio: 'ignore'
            }, function (){
            browserSync({
                proxy: '127.0.0.1:' + config.browserSync.browserPort,
                ui: {
                    port: config.browserSync.UIPort
                }, 
                // logLevel: 'silent', 
                // logConnections: false,
                // notify: false
            });
        });

        //TODO test this if better in bs.stream()
        // if(!config.browserSync.autoreload) return;

        // gulp.watch(['public/**/*.{php,html,js,css}']).on('change', function () {
        //     browserSync.reload();
        // });
    });
}
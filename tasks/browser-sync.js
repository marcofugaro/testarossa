import gulp from 'gulp';
import browserSync from 'browser-sync';
import connect from 'gulp-connect-php';

import config from './../gulpfile.babel';


gulp.task('browser-sync', function() {
    
    connect.server({ 
            base: config.buildDir,
            stdio: 'ignore'
        }, function() {
        browserSync({
            proxy: '127.0.0.1:8000',
            logLevel: 'silent',
            notify: false,
            open: config.openBrowser
        });
    });
});

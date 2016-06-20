import gulp from 'gulp';
import del from 'del';

import config from './../gulpfile.babel';


gulp.task('clean', function() {
    return del([config.buildDir]);
});
import gulp from 'gulp';
import gzip from 'gulp-gzip';

import config from './../gulpfile.babel';


gulp.task('gzip', function() {

    if(!config.gzip) return;

    return gulp.src(config.buildDir + '**/*.{html,php,xml,json,css,js,js.map,css.map}', { base: config.sourceDir })
        .pipe(gzip()) //TODO .gz extension or not?
        .pipe(gulp.dest(config.buildDir));
});
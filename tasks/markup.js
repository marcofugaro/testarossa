import gulp from 'gulp';
import gulpif from 'gulp-if';
import changed from 'gulp-changed';
import browserSync from 'browser-sync';

import config from './../gulpfile.babel';


gulp.task('markup', function() {

  return gulp.src(config.markup.src, { base: config.sourceDir })
    .pipe(changed(config.markup.dest))
    .pipe(gulp.dest(config.markup.dest))
    .pipe(gulpif(config.autoreload, browserSync.stream()));
});

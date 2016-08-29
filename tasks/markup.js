import gulp from 'gulp';
import gulpif from 'gulp-if';
import changed from 'gulp-changed';
import versionAppend from 'gulp-version-append';
import browserSync from 'browser-sync';

import config from './../gulpfile.babel';


gulp.task('markup', () => {
  return gulp.src(config.markup.src, { base: config.sourceDir })
    .pipe(changed(config.markup.dest))
    .pipe(versionAppend(['css', 'js']))
    .pipe(gulp.dest(config.markup.dest))
    .pipe(gulpif(config.autoreload, browserSync.stream()));
});

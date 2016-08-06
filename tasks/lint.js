import gulp from 'gulp';
import eslint from 'gulp-eslint';
import notify from 'gulp-notify';

import config from './../gulpfile.babel';


gulp.task('lint', function() {
  return gulp.src(config.scripts.src)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .on('error', notify.onError('<%= error.message %>'));
});

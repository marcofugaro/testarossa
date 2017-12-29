import gulp from 'gulp';
import gulpif from 'gulp-if';
import eslint from 'gulp-eslint';
import notify from 'gulp-notify';
import eslintIfFixed from 'gulp-eslint-if-fixed';

import config from './../gulpfile.babel';


gulp.task('eslint', () => {
  if (!config.scripts.lint)
    return;

  return gulp.src(config.scripts.src)
    .pipe(eslint({ fix: config.scripts.lintAutofix }))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
    .on('error', notify.onError({
      title: 'Error linting scripts!',
      message: '<%= error.message %>',
    }))
    .pipe(gulpif(config.scripts.lintAutofix, eslintIfFixed(config.scripts.srcDir)));
});

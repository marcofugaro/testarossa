import gulp from 'gulp'
import gulpStylelint from 'gulp-stylelint'
import notify from 'gulp-notify'
import gulpif from 'gulp-if'

import config from './../gulpfile.babel'


gulp.task('stylelint', () => {
  if (!config.styles.lint)
    return

  return gulp.src([config.styles.src, '!**/mixins/**/*'])
    .pipe(gulpStylelint({
      reporters: [
        { formatter: 'string', console: true }
      ]
    }))
    .on('error', notify.onError({
      title: 'Error linting styles!',
      message: '<%= error.message %>',
    }))
    .pipe(gulpif(false, () => {})) // TODO remove this HACK made to be able to return a gulp stream when the task is called from run-sequence (see https://github.com/OverZealous/run-sequence#usage)
})

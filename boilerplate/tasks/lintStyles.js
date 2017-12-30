import gulp from 'gulp'
import gulpStylelint from 'gulp-stylelint'
import notify from 'gulp-notify'

import { config } from '../gulpfile'


export function lintStyles(done) {
  if (!config.styles.lint)
    return done()

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
}

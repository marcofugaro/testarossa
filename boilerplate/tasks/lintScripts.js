import gulp from 'gulp'
import eslint from 'gulp-eslint'
import notify from 'gulp-notify'

import { config } from '../gulpfile'


export function lintScripts(done) {
  if (!config.scripts.lint)
    return done()

  return gulp.src(config.scripts.src)
    .pipe(eslint())
    .pipe(eslint.format('pretty'))
    .pipe(eslint.failAfterError())
    .on('error', notify.onError({
      title: 'Error linting scripts!',
      message: '<%= error.message %>',
    }))
}

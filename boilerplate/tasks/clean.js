import gulp from 'gulp'
import del from 'del'

import config from './../gulpfile.babel'


gulp.task('clean', () => {
  return del([config.buildDir])
})

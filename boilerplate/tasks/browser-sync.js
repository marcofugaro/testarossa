import gulp from 'gulp'
import browserSync from 'browser-sync'

import config from './../gulpfile.babel'


gulp.task('browser-sync', () => {
  browserSync.init({
    server: {
      baseDir: config.buildDir,
    },
    notify: false,
    open: config.openBrowser,
  })
})
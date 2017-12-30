import gulp from 'gulp'
import { fonts, images, lintScripts, lintStyles, markup, styles } from '.'

import { config } from '../gulpfile'


export function watch() {
  gulp.watch(config.markup.src, markup)
  gulp.watch(config.styles.src, styles)
  gulp.watch(config.images.src, images)
  gulp.watch(config.fonts.src, fonts)
  if (config.styles.lint) {
    gulp.watch(config.styles.src, lintStyles)
  }
  if (config.scripts.lint) {
    gulp.watch(config.scripts.src, lintScripts)
  }
}

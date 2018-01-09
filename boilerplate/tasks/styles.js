import gulp from 'gulp'
import gulpif from 'gulp-if'
import sourcemaps from 'gulp-sourcemaps'
import sass from 'gulp-sass'
import notify from 'gulp-notify'
import browserSync from 'browser-sync'
import postcss from 'gulp-postcss'
import autoprefixer from 'autoprefixer'
import sassGlob from 'gulp-sass-glob'
import moduleImporter from 'sass-module-importer'
import outdent from 'outdent'

import { config } from '../gulpfile'


export function styles() {
  // TODO set it 'compressed' when this issue is solved https://github.com/sass/node-sass/issues/957
  const outputStyle = global.IS_PRODUCTION ? 'compressed' : 'expanded'
  const useSourcemaps = !global.IS_PRODUCTION || config.styles.prodSourcemaps

  return gulp.src(config.styles.src)
    .pipe(gulpif(useSourcemaps, sourcemaps.init()))
    .pipe(sassGlob())
    .pipe(sass({
      outputStyle,
      importer: moduleImporter(),
      includePaths: 'node_modules/',
    }))
    .on('error', notify.onError({
      title: 'Error compiling styles!',
      message: outdent`
        <%= error.messageOriginal %>
        on line (<%= error.line %>:<%= error.column %>) of <%= error.relativePath %>
      `,
    }))
    .pipe(gulpif(global.IS_PRODUCTION, postcss([
      autoprefixer(), // browsers are taken from package.json
    ])))
    .pipe(gulpif(useSourcemaps, sourcemaps.write('./')))
    .pipe(gulp.dest(config.styles.dest))
    .pipe(gulpif(config.autoreload, browserSync.stream()))
}

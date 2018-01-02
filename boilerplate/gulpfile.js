import gulp from 'gulp'
import { browserSync, clean, fonts, images, lintScripts, lintStyles, markup, pushToServer, scripts, sizeReport, styles, watch } from './tasks'
import dotenv from 'dotenv'

// let's read the .env file
dotenv.config()

if (process.title.includes('gulp dev')) {
  // make NODE_ENV default to development
  process.env.NODE_ENV = process.env.NODE_ENV === 'production' ? process.env.NODE_ENV : 'development'
} else {
  // make NODE_ENV default to production
  process.env.NODE_ENV = process.env.NODE_ENV === 'development' ? process.env.NODE_ENV : 'production'
}

global.IS_PRODUCTION = process.env.NODE_ENV === 'production'


const sourceDir = 'src'
const buildDir = 'build'

export const config = {
  sourceDir,
  buildDir,
  autoreload: true,
  openBrowser: false,
  https: true,
  http2: true,

  markup: {
    src: `${sourceDir}/*.*`,
    dest: buildDir,
  },

  styles: {
    src: `${sourceDir}/scss/**/*.scss`,
    dest: `${buildDir}/css`,
    sourcemaps: true,
    lint: false,
  },

  scripts: {
    src: `${sourceDir}/js/**/*.js`,
    dest: `${buildDir}/js`,
    srcDir: `${sourceDir}/js`,
    bundleName: 'main.js',
    sourcemaps: true,
    lint: false,
  },

  images: {
    src: `${sourceDir}/images/**/*`,
    dest: `${buildDir}/images`,
    webp: true,
  },

  fonts: {
    src: `${sourceDir}/fonts/**/*`,
    dest: `${buildDir}/fonts`,
  },

}


gulp.task('dev', gulp.series(
  clean,
  gulp.parallel(markup, lintStyles, styles, lintScripts, scripts, images, fonts),
  gulp.parallel(browserSync, watch),
))

gulp.task('build', gulp.series(
  clean,
  gulp.parallel(markup, lintStyles, styles, lintScripts, scripts, images, fonts),
  sizeReport,
))

gulp.task('deploy', gulp.series('build', pushToServer))

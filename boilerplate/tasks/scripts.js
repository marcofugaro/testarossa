import gulp from 'gulp'
import webpackStream from 'webpack-stream'
import Dotenv from 'dotenv-webpack'
import gulpif from 'gulp-if'
import named from 'vinyl-named'
import sourcemaps from 'gulp-sourcemaps'
import notify from 'gulp-notify'
import browserSync from 'browser-sync'

import { config } from '../gulpfile'

const webpackConfig = {
  output: {
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  plugins: [
    new Dotenv(),
  ],
  resolve: {
    modules: ['node_modules', 'src'],
  },
}

export function scripts() {
  return gulp.src(`${config.scripts.srcDir}/${config.scripts.bundleName}`)
    .pipe(gulpif(config.scripts.sourcemaps, sourcemaps.init({ loadMaps: true })))
    .pipe(named())
    .pipe(webpackStream(webpackConfig))
    .on('error', notify.onError({
      title: 'Error compiling scripts!',
    }))
    .pipe(gulpif(config.scripts.sourcemaps, sourcemaps.write('./')))
    .pipe(gulp.dest(config.scripts.dest))
    .pipe(gulpif(config.autoreload, browserSync.stream()))
}

// watch mode and sourcemaps, read the webpack stream config

// .pipe(gulpif(global.IS_PRODUCTION, uglify()))

import gulp from 'gulp'
import webpackStream from 'webpack-stream'
import webpack from 'webpack'
import Dotenv from 'dotenv-webpack'
import named from 'vinyl-named'
import notifier from 'node-notifier'
import browserSync from 'browser-sync'
import outdent from 'outdent'
import path from 'path'

import { config } from '../gulpfile'


function extractErrorInfo(errorString) {
  const lines = errorString.split('\n')
  const filePath = lines[0]
  const message = lines[1]
    .slice(0, lines[1].lastIndexOf('('))
    .slice('Module build failed: '.length)
    .replace(`${path.resolve(filePath)}: `, '')
  const address = lines[1].slice(lines[1].lastIndexOf('('))

  return {
    filePath,
    message,
    address,
  }
}

export function scripts() {
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
    mode: global.IS_PRODUCTION ? 'production' : 'development',
    watch: !global.IS_PRODUCTION,
    // when is not production, sourcemaps are already included in mode: 'development'
    ...(global.IS_PRODUCTION && config.scripts.prodSourcemaps ? { devtool: 'source-map' } : {}),
    plugins: [
      new Dotenv(),
    ],
    resolve: {
      modules: ['node_modules', 'src'],
    },
  }

  return gulp.src(config.scripts.src)
    .pipe(named())
    .pipe(webpackStream(webpackConfig, webpack, (err, stats) => {
      if (stats.hasErrors() || err) {
        const error = stats.toJson().errors[0]
        const { filePath, message, address } = extractErrorInfo(error)

        console.log(error || err)
        return notifier.notify({
          title: 'Error compiling scripts!',
          message: outdent`
            ${message}
            on line ${address} of ${filePath}
          `,
        })
      }

      if (config.autoreload) {
        browserSync.reload()
      }
    }))
    .pipe(gulp.dest(config.scripts.dest))
}

// TODOs
// take from accurapp
// code splitting between vendor and main??

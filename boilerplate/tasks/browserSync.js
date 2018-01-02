import gulp from 'gulp'
import browserSyncInstance from 'browser-sync'

import { config } from '../gulpfile'


export function browserSync() {
  // TODO use browserSyncInstance.create() ?
  browserSyncInstance.init({
    server: {
      baseDir: config.buildDir,
    },
    https: config.https,
    httpModule: config.http2 ? 'http2' : null,
    notify: false,
    open: config.openBrowser,
  })
}

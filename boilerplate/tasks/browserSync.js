import gulp from 'gulp'
import browserSyncInstance from 'browser-sync'

import { config } from '../gulpfile'


export function browserSync() {
  // TODO use browserSyncInstance.create() ?
  // TODO openbrowser on already existing tab like create-react-app
  browserSyncInstance.init({
    server: {
      baseDir: config.buildDir,
    },
    https: config.http2,
    httpModule: config.http2 ? 'http2' : null,
    notify: false,
    open: config.openBrowser,
  })
}

import gulp from 'gulp'
import sftp from 'gulp-sftp'

import { config } from '../gulpfile'


export function pushToServer() {
  return gulp.src(config.buildDir)
    .pipe(sftp({
      host: process.env.SFTP_HOST,
      port: process.env.SFTP_PORT,
      user: process.env.SFTP_USER,
      pass: process.env.SFTP_PASS,
      remotePath: process.env.SFTP_REMOTEPATH,
    }))
}

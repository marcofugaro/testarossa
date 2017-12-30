import gulp from 'gulp'
import del from 'del'

import { config } from '../gulpfile'


export function clean() {
  return del(config.buildDir)
}

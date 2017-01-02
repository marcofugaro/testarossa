import gulp from 'gulp';
import sftp from 'gulp-sftp';
import dotenv from 'dotenv';

import config from './../gulpfile.babel';


gulp.task('deploy', ['build'], () => {
  // let's read the .env file
  dotenv.config();

  return gulp.src(config.buildDir)
    .pipe(sftp({
      host: process.env.SFTP_HOST,
      port: process.env.SFTP_PORT,
      user: process.env.SFTP_USER,
      pass: process.env.SFTP_PASS,
      remotePath: process.env.SFTP_REMOTEPATH,
    }));
});

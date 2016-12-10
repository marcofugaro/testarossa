import gulp from 'gulp';
import sftp from 'gulp-sftp';

import config from './../gulpfile.babel';


gulp.task('deploy', ['build'], () => {
  return gulp.src(config.buildDir)
    .pipe(sftp(config.deploy));
});

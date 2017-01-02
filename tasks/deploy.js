import gulp from 'gulp';
import ghPages from 'gulp-gh-pages';

import config from './../gulpfile.babel';


gulp.task('deploy', ['build'], () => {
  return gulp.src(`${config.buildDir}/**/*`)
    .pipe(ghPages());
});

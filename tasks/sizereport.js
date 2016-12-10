import gulp from 'gulp';
import sizereport from 'gulp-sizereport';

import config from './../gulpfile.babel';


gulp.task('sizereport', () => {
  return gulp.src(`${config.buildDir}/**/*.{css,js}`)
    .pipe(sizereport({
      gzip: true,
    }));
});

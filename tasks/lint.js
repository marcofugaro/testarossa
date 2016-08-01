import gulp from 'gulp';
import eslint from 'gulp-eslint';

gulp.task('lint', function() {
  return gulp.src(config.scripts.src)
    .pipe(eslint()) 
    .pipe(eslint.format()) 
    .on('error', notify.onError('<%= error.message %>')) //TODO test it https://github.com/spalger/gulp-jshint/issues/91
    .pipe(gulpif(config.autoreload, browserSync.stream()));
});

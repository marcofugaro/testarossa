module.exports = function(config) { 

    var gulp = require('gulp');
    var {
      protractor,
      webdriver,
      webdriver_update
    } = require('gulp-protractor');

    gulp.task('webdriver-update', webdriver_update);
    gulp.task('webdriver', webdriver);

    gulp.task('protractor', ['webdriver-update', 'webdriver', 'browserSync'], function(cb = function() {}) {

      gulp.src('test/e2e/**/*.js').pipe(protractor({
          configFile: config.test.protractor
      })).on('error', (err) => {
        // Make sure failed tests cause gulp to exit non-zero
        throw err;
      }).on('end', () => {
        process.exit();
        cb();
      });

    });
}
import gulp from 'gulp';
import requireDir from 'require-dir';
import runSequence from 'run-sequence';


const sourceDir = 'src';
const buildDir = 'build';

export default {

  sourceDir,
  buildDir,
  modernizr: true,
  autoreload: true,
  openBrowser: true,

  markup: {
    src: [`${sourceDir}/*.*`, `${sourceDir}/partials/**/*`],
    dest: buildDir,
  },

  styles: {
    src: `${sourceDir}/sass/**/*.scss`,
    dest: `${buildDir}/css`,
    sourcemaps: true,
  },

  scripts: {
    src: `${sourceDir}/js/main.js`,
    dest: `${buildDir}/js`,
    bundleName: 'main.js',
    watch: `${sourceDir}/js/**/*.js`,
    sourcemaps: true,
  },

  images: {
    src: `${sourceDir}/images/**/*`,
    dest: `${buildDir}/images`,
  },

  fonts: {
    src: `${sourceDir}/fonts/**/*`,
    dest: `${buildDir}/fonts`,
  },

};


requireDir('./tasks');


gulp.task('dev', ['clean'], (cb) => {
  global.isProduction = false;
  runSequence(['markup', 'styles', 'lint', 'browserify', 'images', 'fonts'], 'watch', cb);
});

gulp.task('build', ['clean'], (cb) => {
  global.isProduction = true;
  runSequence(['markup', 'styles', 'browserify', 'images', 'fonts'], 'modernizr', cb);
});

gulp.task('default', ['dev']);

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
    lint: true,
  },

  scripts: {
    src: `${sourceDir}/js/**/*.js`,
    dest: `${buildDir}/js`,
    srcDir: `${sourceDir}/js`,
    bundleName: 'main.js',
    sourcemaps: true,
    lint: true,
    lintAutofix: false,
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
  runSequence(['markup', 'stylelint', 'styles', 'eslint', 'browserify', 'images', 'fonts'], 'watch', cb);
});

gulp.task('build', ['clean'], (cb) => {
  global.isProduction = true;
  runSequence(['markup', 'stylelint', 'styles', 'eslint', 'browserify', 'images', 'fonts'], 'modernizr', cb);
});

gulp.task('default', ['dev']);

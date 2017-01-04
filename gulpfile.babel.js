import gulp from 'gulp';
import requireDir from 'require-dir';
import runSequence from 'run-sequence';


const sourceDir = 'src';
const buildDir = 'build';

const config = {
  sourceDir,
  buildDir,
  modernizr: true,
  autoreload: true,
  openBrowser: false,

  markup: {
    src: `${sourceDir}/*.*`,
    dest: buildDir,
  },

  styles: {
    src: `${sourceDir}/sass/**/*.scss`,
    dest: `${buildDir}/css`,
    sourcemaps: true,
    lint: false,
    cssnext: false,
  },

  scripts: {
    src: `${sourceDir}/js/**/*.js`,
    dest: `${buildDir}/js`,
    srcDir: `${sourceDir}/js`,
    bundleName: 'main.js',
    sourcemaps: true,
    lint: false,
    lintAutofix: false,
  },

  images: {
    src: `${sourceDir}/images/**/*`,
    dest: `${buildDir}/images`,
    webp: true,
  },

  fonts: {
    src: `${sourceDir}/fonts/**/*`,
    dest: `${buildDir}/fonts`,
  },

};
export default config;


requireDir('./tasks');


gulp.task('dev', ['clean'], (cb) => {
  // make NODE_ENV default to development
  process.env.NODE_ENV = process.env.NODE_ENV === 'production' ? process.env.NODE_ENV : 'development';

  global.IS_PRODUCTION = process.env.NODE_ENV === 'production';

  runSequence(['markup', 'stylelint', 'styles', 'eslint', 'browserify', 'images', 'fonts'], 'watch', cb);
});

gulp.task('build', ['clean'], (cb) => {
  // make NODE_ENV default to production
  process.env.NODE_ENV = process.env.NODE_ENV === 'development' ? process.env.NODE_ENV : 'production';

  global.IS_PRODUCTION = process.env.NODE_ENV === 'production';

  runSequence(['markup', 'stylelint', 'styles', 'eslint', 'browserify', 'images', 'fonts'], 'modernizr', 'sizereport', cb);
});

gulp.task('default', ['dev']);

import gulp from 'gulp';
import gulpif from 'gulp-if';
import sourcemaps from 'gulp-sourcemaps';
import sass from 'gulp-sass';
import notify from 'gulp-notify';
import browserSync from 'browser-sync';
import postcss from 'gulp-postcss';
import cssnext from 'postcss-cssnext';
import autoprefixer from 'autoprefixer';
import sassGlob from 'gulp-sass-glob';
import moduleImporter from 'sass-module-importer';

import config from './../gulpfile.babel';


gulp.task('styles', () => {
  // TODO set it 'compressed' when this issue is solved https://github.com/sass/node-sass/issues/957
  const outputStyle = global.isProduction ? 'compressed' : 'expanded';

  const processor = config.styles.cssnext ? cssnext : autoprefixer;

  return gulp.src(config.styles.src)
    .pipe(gulpif(config.styles.sourcemaps, sourcemaps.init()))
    .pipe(sassGlob())
    .pipe(sass({
      outputStyle,
      importer: moduleImporter(),
      includePaths: 'node_modules/',
    }))
    .on('error', notify.onError('<%= error.message %>'))
    .pipe(postcss([
      processor({ browsers: ['last 2 versions', '> 1%', 'ie 9'] })
    ]))
    .pipe(gulpif(config.styles.sourcemaps, sourcemaps.write('./')))
    .pipe(gulp.dest(config.styles.dest))
    .pipe(gulpif(config.autoreload, browserSync.stream()));
});

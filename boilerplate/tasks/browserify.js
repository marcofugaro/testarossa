import gulp from 'gulp';
import gulpif from 'gulp-if';
import source from 'vinyl-source-stream';
import sourcemaps from 'gulp-sourcemaps';
import buffer from 'vinyl-buffer';
import watchify from 'watchify';
import babelify from 'babelify';
import envify from 'envify';
import browserifyShim from 'browserify-shim';
import browserify from 'browserify';
import notify from 'gulp-notify';
import uglify from 'gulp-uglify';
import browserSync from 'browser-sync';

import config from './../gulpfile.babel';


gulp.task('browserify', () => {
  let b = browserify({
    entries: [`${config.scripts.srcDir}/${config.scripts.bundleName}`],
    paths: [config.sourceDir, 'node_modules/'],
    debug: config.scripts.sourcemaps,
    cache: {}, // required for watchify
    packageCache: {}, // required for watchify
    fullPaths: !global.IS_PRODUCTION, // required to be true only for watchify
  });

  if (!global.IS_PRODUCTION) {
    b = watchify(b);
    b.on('update', bundle);
  }


  const transforms = [
    { name: babelify }, // options are taken from .babelrc
    { name: envify },
    { name: browserifyShim, options: { global: true } },
  ];

  transforms.forEach((transform) => {
    b.transform(transform.name, transform.options);
  });


  function bundle() {
    return b.bundle()
      .on('error', notify.onError({
        title: 'Error compiling scripts!',
        message: `\n<%= error.message.split(': ')[1].split(' (')[0] %>\non line (<%= error.loc.line %>:<%= error.loc.column %>) of /src<%= error.filename.split('/src')[1] %>\n<%= error.codeFrame %>`,
      }))
      .pipe(source(config.scripts.bundleName))
      .pipe(buffer())
      .pipe(gulpif(config.scripts.sourcemaps, sourcemaps.init({ loadMaps: true })))
      .pipe(gulpif(global.IS_PRODUCTION, uglify()))
      .pipe(gulpif(config.scripts.sourcemaps, sourcemaps.write('./')))
      .pipe(gulp.dest(config.scripts.dest))
      .pipe(gulpif(config.autoreload, browserSync.stream()));
  }

  return bundle();
});

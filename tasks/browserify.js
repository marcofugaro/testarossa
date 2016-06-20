import gulp from 'gulp';
import gulpif from 'gulp-if';
import source from 'vinyl-source-stream';
import sourcemaps from 'gulp-sourcemaps';
import buffer from 'vinyl-buffer';
import watchify from 'watchify';
import browserify from 'browserify';
import notify from 'gulp-notify';
import uglify from 'gulp-uglify';
import browserSync from 'browser-sync';

import config from './../gulpfile.babel';


gulp.task('browserify', function() {

    const b = browserify({
        entries: [config.browserify.src],
        debug: config.browserify.sourcemaps,
        cache: {},
        packageCache: {},
        fullPaths: !global.isProduction //why?? try to remove these three http://blog.avisi.nl/2014/04/25/how-to-keep-a-fast-build-with-browserify-and-reactjs/
    });

    if ( !global.isProduction ) {
        b = watchify(b);
        b.on('update', bundle);
    }


    const transforms = ['brfs'];

    transforms.forEach(function(transform) {
        b.transform(transform); //TODO test it empty
    });


    // const sourceMapLocation = global.isProduction ? './' : ''; //TODo test if this works in local


    function bundle() {

        return b.bundle()
            .on('error', notify.onError('<%= error.message %>'))
            .pipe(source(config.browserify.bundleName))
            .pipe(buffer())
            .pipe(gulpif(config.browserify.sourcemaps, sourcemaps.init({ loadMaps: true })))
            .pipe(gulpif(global.isProduction, uglify()))
            .pipe(gulpif(config.browserify.sourcemaps, sourcemaps.write('./')))
            .pipe(gulp.dest(config.scripts.dest))
            .pipe(gulpif(config.autoreload, browserSync.stream()));
    }

    return bundle();
});

module.exports = function(config) { 

    'use strict';

    var gulp = require('gulp');
    var gulpif = require('gulp-if');
    var source = require('vinyl-source-stream');
    var sourcemaps = require('gulp-sourcemaps');
    var buffer = require('vinyl-buffer');
    var watchify = require('watchify');
    var browserify = require('browserify');
    var notify = require('gulp-notify');
    var addsrc = require('gulp-add-src');
    var uglify = require('gulp-uglify');
    var browserSync = require('browser-sync');

    gulp.task('browserify', function() {
      
        var b = browserify({
            entries: [config.sourceDir + 'js/main.js'],
            debug: config.browserify.sourcemaps,
            cache: {},
            packageCache: {},
            fullPaths: !global.isProduction //why?? try to remove these three http://blog.avisi.nl/2014/04/25/how-to-keep-a-fast-build-with-browserify-and-reactjs/
        });


        if ( !global.isProduction ) {
            b = watchify(b);

            b.on('update', bundle);
        }


        var transforms = ['brfs'];

        transforms.forEach(function(transform) {
            b.transform(transform); //TODO test it empty
        });


        // var sourceMapLocation = global.isProduction ? './' : ''; //TODo test if this works in local


        function bundle() {

            return b.bundle().on('error', notify.onError('<%= error.message %>'))
                .pipe(source('main.js'))
                .pipe(buffer())
                .pipe(gulpif(config.browserify.sourcemaps, sourcemaps.init({ loadMaps: true })))
                .pipe(gulpif(global.isProduction, addsrc.prepend(config.modernizr.tmp)))
                .pipe(gulpif(global.isProduction, uglify({ compress: { drop_console: true /*why??*/ } })))
                .pipe(gulpif(config.browserify.sourcemaps, sourcemaps.write('./')))
                .pipe(gulp.dest(config.scripts.dest))
                .pipe(callback(function() { return del(config.modernizr.tmp); }));  
                .pipe(gulpif(config.browserSync.autoreload, browserSync.stream()));
        }

        return bundle();
    });
}
import gulp from 'gulp';
import changed from 'gulp-changed';
import gulpif from 'gulp-if';
import imagemin from 'gulp-imagemin';
import pngquant from 'imagemin-pngquant';
import browserSync from 'browser-sync';

import config from './../gulpfile.babel';


gulp.task('images', function() {

    return gulp.src(config.images.src, { base: config.sourceDir }) //TODO fix this base
        .pipe(changed(config.images.dest))
        .pipe(gulpif(global.isProduction, imagemin({ 
            use: [pngquant()],  // TODO test this or the default png optimizer, and ADD svg optimizer
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest(config.images.dest))
        .pipe(gulpif(config.autoreload, browserSync.stream()));
});
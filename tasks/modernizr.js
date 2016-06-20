import gulp from 'gulp';
import modernizr from 'gulp-modernizr';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import addsrc from 'gulp-add-src';

import config from './../gulpfile.babel';


gulp.task('modernizr', function() { 

    if(!config.modernizr) return;

    return gulp.src([config.styles.src, config.scripts.src])  
        .pipe(modernizr({
            options:  ['setClasses', 'addTest', 'testProp', 'fnBind']
        }))
        .pipe(uglify())
        .pipe(addsrc.append(config.browserify.dest))
        .pipe(concat(config.browserify.bundleName))
        .pipe(gulp.dest(config.scripts.dest));  
});

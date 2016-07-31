import gulp from 'gulp';
import requireDir from 'require-dir';
import runSequence from 'run-sequence';


const sourceDir = 'src/';
const buildDir = 'build/';

export default {

    sourceDir,
    buildDir,
    gzip: false,
    modernizr: true,
    autoreload: true,
    openBrowser: false,
    pagespeed: true,
    domain: 'example.com',

    markup: {
        src: [sourceDir + '*.*', sourceDir + 'partials/**/*'],
        dest: buildDir,
    },

    styles: {
        src: sourceDir + 'sass/**/*.scss',
        dest: buildDir + 'css',
        sourcemaps: true
    },

    scripts: {
        src: sourceDir + 'js/**/*.js',
        dest: buildDir + 'js'
    },

    browserify: {
        src: sourceDir + 'js/main.js',
        dest: buildDir + 'js/main.min.js',
        bundleName: 'main.min.js',
        sourcemaps: true
    },

    images: {
        src: sourceDir + 'images/**/*',
        dest: buildDir + 'images'
    },

    fonts: {
        src: sourceDir + 'fonts/**/*',
        dest: buildDir + 'fonts'
    }

};

const tasks = requireDir('./tasks');


gulp.task('dev', ['clean'], function(cb) {
    global.isProduction = false;
    runSequence(['markup', 'styles', 'browserify', 'images', 'fonts'], 'watch', cb);
});

gulp.task('build', ['clean'], function(cb) {
    global.isProduction = true;
    runSequence(['markup', 'styles', 'browserify', 'images', 'fonts'], 'modernizr', 'gzip', cb);
});

gulp.task('deploy', ['build'], function(cb) {
    runSequence('upload', 'pagespeed', cb);
});

gulp.task('default', ['dev']);
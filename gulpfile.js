var gulp = require('gulp');
var fs = require('fs');
// var requireDir = require('require-dir');

'use strict';

var config = {
    sourceDir: './src/',
    buildDir: './build/',
    gzip: true
};

config.styles = {
    src: config.sourceDir + 'scss/**/*.scss',
    dest: config.buildDir + 'css',
    sourcemaps: true
};

config.scripts = {
    src: config.sourceDir + 'js/**/*.js',
    dest: config.buildDir + 'js'
};

config.images = {
    src: config.sourceDir + 'images/**/*',
    dest: config.buildDir + 'images'
};

config.fonts = {
    src: [config.sourceDir + 'fonts/**/*'],
    dest: config.buildDir + 'fonts'
};

config.browserSync = {
    browserPort: 3000,
    UIPort: 3001,
    autoreload: true
};

config.browserify = {
    bundleName: 'main.js',
    sourcemaps: false
};

config.test = {
    karma: 'test/karma.conf.js',
    protractor: 'test/protractor.conf.js'
};


//var tasks = requireDir('./tasks', { args: config }); //Possible when they accept pull requests at requireDir

var tasks = fs.readdirSync('./tasks');
tasks.forEach(function(task) {
    if(task.slice(-3) === '.js') require('./tasks/' + task)(config);
});

gulp.task('default', ['dev']);
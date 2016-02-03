'use strict';

var gulp = require('gulp');
var fs = require('fs');
var assign = require('lodash.assign');
// var requireDir = require('require-dir');

var config = {
    sourceDir: './src/',
    buildDir: './build/',
    gzip: false,
    modernizr: true,
    autoreload: true
};

assign(config, {

    styles: {
        src: config.sourceDir + 'sass/**/*.scss',
        dest: config.buildDir + 'css',
        sourcemaps: true
    },

    scripts: {
        src: config.sourceDir + 'js/**/*.js',
        dest: config.buildDir + 'js'
    },

    images: {
        src: config.sourceDir + 'images/**/*',
        dest: config.buildDir + 'images'
    },

    fonts: {
        src: [config.sourceDir + 'fonts/**/*'],
        dest: config.buildDir + 'fonts'
    },

    browserify: {
        src: config.sourceDir + 'js/main.js',
        dest: config.buildDir + 'js/main.min.js',
        bundleName: 'main.min.js',
        sourcemaps: false
    },

});


//var tasks = requireDir('./tasks', { args: config }); //Possible when they accept pull requests at requireDir

var tasks = fs.readdirSync('./tasks');
tasks.forEach(function(task) {
    if(task.slice(-3) === '.js') require('./tasks/' + task)(config);
});

gulp.task('default', ['dev']);
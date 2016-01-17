module.exports = function(config) { 

    var path = require('path');
    var gulp = require('gulp');
    var {Server} = require('karma');

    gulp.task('unit', ['views'], function() {

      new Server({
        configFile: path.resolve(__dirname, '../..', config.test.karma),
        singleRun: true
      }).start();

    });
}
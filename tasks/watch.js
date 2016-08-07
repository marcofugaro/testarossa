import gulp from 'gulp';

import config from './../gulpfile.babel';


gulp.task('watch', ['browser-sync'], () => {
  gulp.watch(config.markup.src, ['markup']);
  gulp.watch(config.styles.src, ['stylelint', 'styles']);
  gulp.watch(config.scripts.src, ['lint']);
  gulp.watch(config.images.src, ['images']);
  gulp.watch(config.fonts.src, ['fonts']);
});

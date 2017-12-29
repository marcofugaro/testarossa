import gulp from 'gulp';

import config from './../gulpfile.babel';


gulp.task('watch', ['browser-sync'], () => {
  gulp.watch(config.markup.src, ['markup']);
  gulp.watch(config.styles.src, ['stylelint', 'styles']);
  gulp.watch(config.scripts.src, ['eslint']); // TODO add conditional watch with linting
  gulp.watch(config.images.src, ['images']);
  gulp.watch(config.fonts.src, ['fonts']);
});

import gulp from 'gulp';
import pagespeed from 'psi';

import config from './../gulpfile.babel';


gulp.task('pagespeed', function() {

    if(!config.pagespeed) return;

    return pagespeed.output(config.domain, {
        strategy: 'mobile'
    });
});
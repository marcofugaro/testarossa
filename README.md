# gulp-frontend-boilerplate - WORK IN PROGRESS
An up-to-date gulp boilerplate for static front-end websites.

Oh shit, another fucking boilerplate
Probably you

A thing that irritates me about boilerplates is that you're supposed to libe by their rules without knowing what's being done at your files

Modularize, if you don't need a thing just remove it
Easy to customize in the main gulpfile
Code is written as humanly understandable as possible not as all those hard to understang gulpfile globs.
so it doesn't feel overwhelming

It uses npm as a package manager for both sass and js. For this reason it is recommended using `npm@3` since it has flat dependency management.
In sass the packages are required with --- and in js browserify handles dependencies.

The  gulpfile.js contains the main configuration object, and all other tasks are in the `tasks` folder which contains:

- [Browserify](http://browserify.org/) & [Watchify](https://github.com/substack/watchify) and Babelilfy for ES6 and sourcemapping
- [SASS](http://sass-lang.com/) with [autoprefixer](https://github.com/sindresorhus/gulp-autoprefixer)), compiled with LIBSASS, SMACSS, ITCSS, BEM and sourcemapping
- [BrowserSync](http://browsersync.io)
- ESLINT
- Auto Modernizr
- Image and SVG minification, WebP
- Cache control



#### TODO
- gulp4 branch
- add tests?
- rsync or git or nothing? in upload task
- better console logging
- File size reporting? https://github.com/vigetlabs/gulp-starter
- add critical with flag
- add errors to notify messages `(title: '<%= error.name %>', message: '<%= error.message %>')`


##Installation
```
npm install
```

###Tasks
- gulp or gulp dev
- gulp build (production, like compress images, modernizr)

You can also run `npm start` to execute gulp from the local `node_modules` forler if you haven't installed it on your local machine

BrowserSync automoatically starts a server on localhost3000, additional BrowserSync tools available on 3001

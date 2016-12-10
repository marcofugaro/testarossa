# gulp-frontend-boilerplate - WORK IN PROGRESS
An up-to-date gulp boilerplate for static front-end websites.

#### [DOWNLOAD](https://github.com/marcofugaro/gulp-frontend-boilerplate/archive/master.zip)

Oh shit, another fucking boilerplate
Probably you

A thing that irritates me about boilerplates is that you're supposed to libe by their rules without knowing what's being done at your files

Modularize, if you don't need a thing just remove it
Easy to customize in the main gulpfile
Code is written as humanly understandable as possible not as all those hard to understang gulpfile globs.
so you don't have to first decifrate the project structure if you want to modify the build pipeline
so it doesn't feel overwhelming

Up to date and modern

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

- IE9+

#### TODO
- gulp4 branch
- better console logging (logo and stuff)
- add errors to notify messages `(title: '<%= error.name %>', message: '<%= error.message %>')`
- comment very well your code (see create-react-app)
- yarn?
- DOCUMENTATIOOOOOOON


##Installation
```
npm install
```

###Tasks
- npm start
- npm run build (production, like compress images, modernizr)
- NODE_ENV=development npm run build

You can also run `npm start` to execute gulp from the local `node_modules` forler if you haven't installed it on your local machine

BrowserSync automoatically starts a server on localhost3000, additional BrowserSync tools available on 3001

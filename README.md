# Testarossa
> An up-to-date and easily customizable Front-end Boilerplate fueled by Gulp.js

### [DOWNLOAD](https://github.com/marcofugaro/testarossa/archive/master.zip)

> Oh shit, another fucking boilerplate...
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_Probably you right now_

A thing that often bugs me about boilerplates is that you're supposed to live by their rules without knowing what's being done at your files, and if you try to look under the hood, the code is written so unnecessarily abstractly that it triggers your interior JS Fatigue and you end up losing hours before even starting to develop your project.

**Testarossa** is:
- **Easily confugurable** through the simple and understandable `config` in the main gulpfile
- **Well documented and commented**, this makes it easy to customize it and bend it to your own will, also code is writtes as more humanly understandable as possible
- **Modular**, if you don't need a certain task you can just remove it
- **Up to date** with the latest technologies and tools to make your development easier


## Features
Testarossa uses npm as a package manager to handle **vendors** for both sass and js (for this reason it is recommended using a `npm` version >= 3 since it has flat dependency management).
How? You just install a package in the dependencies by running `npm install --save package-name` and then you import either in sass with `@import 'package-name';` or `import 'package-name';` in your js files if it's a js package. 

The  gulpfile.js contains the main configuration object, and all other tasks are in the `tasks` folder.

- **Scripts** are bundled with Browserify, transpiled with Babel (settings in the `.babelrc` file)
- **Styles** are written in SCSS, compiled by Libsass, with autoprefixer and css-next, the components are organized following the principles of ITCSS and SMACSS, and the naming convention of BEM
- [BrowserSync](http://browsersync.io) local server with autoreload
- Linting with Stylelint (settings in the .stylelintrc file) and Eslint (settings in the .eslintrc file).
- Sourcemapping for both js and scss
- Modernizr, automatically detecting and including the tests you use
- Loseless Image optimization with Imagemin
- automatic WebP generator and HTML compiler so that the img tags now also include the WebP images (so you don't have to worry about anything!)
- Cache control directly from the package.json version
- Supports IE9+
- HTML partial include with postHTML
- Automatic SFTP deploy


## Guide
After you download it, to install the dependencies run
```
npm install
```
or just `yarn` if you enjoy high speeds!

The main **commands** you can use are
```
npm start
```
to compile for development (sourcemaps) and start the development server

```
npm run build
```
to compile for production (minification and optimizations) and have everything ready in the build folder.

Alternatively you can just build for development by setting the enviroment variable NODE_ENV to development and running the command, on OSX you would do it like this:
```
NODE_ENV=development npm run build
```
or
```
NODE_ENV=production npm start
```


## TODO
- gulp4 branch
- better console logging (logo and stuff)
- comment very well your code (see create-react-app)
- yarn?
- add .env
- DOCUMENTATIOOOOOOON

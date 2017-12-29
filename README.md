# Testarossa
> An up-to-date and easily customizable Front-end Boilerplate fueled by Gulp.js

### [DOWNLOAD](https://github.com/marcofugaro/testarossa/archive/master.zip)


> Oh shit, another fucking boilerplate...
>
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&ndash; _Probably you right now_

A thing that often bugs me about boilerplates is that you're supposed to live by their rules without knowing what's being done at your files, and if you try to look under the hood, the code is written so unnecessarily abstract that it triggers your interior JS Fatigue and you end up losing hours before even starting to develop your project. :finnadie:

The objective of Testarossa is to provide you with the optimal set of tools to develop a site as of today, while being easily hackable and customizable to fit your needs, this is done by the simplicity of [Gulp 4](https://github.com/gulpjs/gulp/tree/4.0).

**Testarossa** is:
- 🔧 **Easily configurable** through the simple and understandable `config` in the main gulpfile
- 📝 **Well documented and commented**, this makes it easy to customize it and bend it to your own will, also code is written as more humanly understandable as possible
- 📦 **Modular**, if you don't need a certain task you can just remove it
- 🆕 **Up to date** with the latest technologies and tools to make your development easier


## Features
Testarossa uses npm as a package manager to handle **vendors** for both sass and js.
How? You just install a package in the dependencies by running `npm install --save package-name` and then you import either in sass with `@import 'package-name';` or `import 'package-name';` in your js files if it's a js package.

The  gulpfile.js contains the main configuration object, and all other tasks are in the `tasks` folder.

- **Scripts** are bundled with [Browserify](http://browserify.org/), transpiled with [Babel](https://babeljs.io/) (settings in the `.babelrc` file)
- **Styles** are written in [SCSS](http://sass-lang.com/), the components are organized following the principles of [ITCSS](https://www.youtube.com/watch?v=1OKZOV-iLj4) and [SMACSS](https://smacss.com/), and the naming convention of [BEM](http://getbem.com/)
- Automatic vendor prefixes with [Autoprefixer](https://github.com/postcss/autoprefixer)
- Support for CSS Custom Properties and other futuristic stuff with [cssnext](http://cssnext.io/)
- [BrowserSync](http://browsersync.io) local server with autoreload
- Linting with [Stylelint](http://stylelint.io/) (settings in the .stylelintrc file) and [ESlint](http://eslint.org/) (settings in the .eslintrc file).
- Possibility to automatically fix your js code with ESlint autofix option 😮
- Sourcemapping for both js and scss
- [Modernizr](https://modernizr.com/), automatically detecting and including the tests you use 👏
- Loseless Image optimization with [Imagemin](https://github.com/sindresorhus/gulp-imagemin)
- automatic WebP generator for both the images and the `img` tag (so you don't have to worry about anything!) 🔥
- Cache control for the js and css bundle with version taken directly from the package.json
- Supports IE9+
- HTML partial include with [PostHTML](https://github.com/posthtml/posthtml)
- Possibility to check if you're in development or production in your js files like this `process.env.NODE_ENV === 'development'` with [envify](https://github.com/hughsk/envify)
- Automatic SFTP deploy
- `.env` file to configure your SFTP deploy or your eventual SMTP mailer, API keys or even a database connection


## TODO
- website
- better console logging (logo and stuff)
- comment very well your code (see create-react-app)
- eslint-plugin-compat
- yarn?
- gulp4 branch
- `grep TODO -rn --exclude-dir=node_modules .`
- setup task for v2

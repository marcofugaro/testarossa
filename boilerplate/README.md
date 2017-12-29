# <%= kebabTitle %>
> <%= description %>

## Guide

#### Install
```
npm install
```
or
```
yarn
```
if you enjoy high speeds! 🚗💨

#### Commands
- `npm start` to compile for development (sourcemaps) and start the development server.
- `npm run build` to compile for production (minification and optimizations) and have everything ready in the `build/` folder.

Alternatively you can just build for development by setting the enviroment variable `NODE_ENV` to development and running the command, on OSX you would do it like this:
```
NODE_ENV=development npm run build
```
you can even do:
```
NODE_ENV=production npm start
```

#### Deploy
There is the option to deploy automatically your website through SFTP, to configure it copy your `.env` file from the `.env.example`, then put your credentials there. Now each time you need to deploy your website you can just run:
```
npm run deploy
```

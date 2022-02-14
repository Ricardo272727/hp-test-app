# amTest

# Setup

- Run `yarn setup:unix` for linux or mac and `yarn setup:windows` for windows

# Enviroment

- After setup, check file env.js generated, you will found something like:
- ```
  module.exports = {
    title: 'Harry Potter app', // name of the app
    lang: 'es', // selected language (not implemented yet)
    prefix: '/', // prefix for dev server and deploy
    port: 5009, // port of the app
    api: 'http://localhost:3000', // api url
    localStoragePrefix: 'harry-potter-app-', // local storage prefix id to prevent token issues with micro services or other apps hosted at the same domain
    mode: 'development', // compile mode: 'development' or 'production'
  };
  ```

# Run project

- After setup and check enviroment variables simply run `yarn start:dev` for compile and open a new tab with the project (for development) or `yarn build` to compile project and deploy

# For curious developers:
## Compile tools

- Check webpack.config.js file, this file setup the webpack tool for development and production enviroments

## Folder structure
- components: for each component there is a folder with a index.js (you need this to code autocomplete and other extentions)
- assets: folder of images, sounds and icons
- data: folder to save raw data
- scss: root folder for scss files (note that components also have a .scss file inside)
- templates: save html templates to be builded with the app
- views: folder to save views (not components or providers)
- ```
  └── src
    ├── assets
    ├── components
    │   ├── Button
    │   └── Icon
    ├── data
    ├── scss
    ├── templates
    └── views
        └── Root
  ```



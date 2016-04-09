# Accessibility Evaluation Tool

Demo: [http://hampshirecollege.github.io/a11yeval](http://hampshirecollege.github.io/a11yeval/index.html)

This tool leverages the [WAVE a11y API](http://wave.webaim.org/api/) developed by [WebAIM](http://webaim.org). Please visit their websites to learn more about accessibility and the WAVE API and the WAVE Chrome extension.

a11y-eval-tool is a JavaScript client-side web app built with [React](http://facebook.github.io/react/), [Bootstrap](http://getbootstrap.com/), and [React-Bootstrap](https://react-bootstrap.github.io/). It was developed using the following JS build tools:
- [Babel](https://babeljs.io/) (transpile ES2015 & JSX)
- [Webpack](https://webpack.github.io/) (bundle JS and more)
- [PostCSS](http://postcss.org/) (transpile scss and autoprefix)
- [ESLint](http://eslint.org/) (lint JS with [Airbnb configs](https://github.com/airbnb/javascript))

and it depends on the following modules (bundled by Webpack):
- [lodash.map](https://www.npmjs.com/package/lodash.map)
- [async.map](https://www.npmjs.com/package/async.map)
- [browser-filesaver](https://www.npmjs.com/package/browser-filesaver) (client-side file saving)
- [es6-promise](https://github.com/stefanpenner/es6-promise) (promise polyfill)
- [he](https://github.com/mathiasbynens/he) (html encoding)
- [moment](http://momentjs.com/) (timestamp formatting)
- [whatwg-fetch](https://github.com/github/fetch) (fetch polyfill)

## Installation instructions
1. clone this repo
2. move the contents of the dist directory to wherever you'd like to serve the app from

## Development instructions
Please feel free to open an issue or submit a pull request. Everything from UX comments/criticisms to performance improvements are welcome and appreciated.

Required: [Node.js](https://nodejs.org/en/)

1. clone this repo
2. `cd <cloned directory>`
3. `npm install`
4. hack away!

`npm run start` fires up the [Express](http://expressjs.com/) dev server which allows for rapid development with hot module replacement.

When ready to deploy run `npm run lint` to lint and `npm run build` to clean the dist directory, rebundle the js, and move the html and css files to the fresh dist directory.

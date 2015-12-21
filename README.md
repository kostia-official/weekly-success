# Week Success

Week Success is a hybrid mobile app for weekly planning. It was created to try Webpack + React + Cordova stack.

For backend used [Dropbox Datastore API](https://www.dropbox.com/developers-v1/datastore/docs/js).

For app env used [Cordova](https://cordova.apache.org) In webview used [React](https://facebook.github.io/react/) with nice components from [Material UI](http://www.material-ui.com).
As application architecture used [Flux](https://facebook.github.io/flux/) and his implementation by [Alt](http://alt.js.org/).

## Development

The following requirements must be met:

Install node 4+
Install cordova `npm install -g ionic cordova`
Install npm packages `npm i`

To serve livereload for browser run `gulp`
To serve livereload for device run `gulp device:serve`

## Build

To build and run release version run `gulp device:run:release`

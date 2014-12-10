3PJS - A lightweight javascript project template for building embeddable javascript applications.
===================

## Overview
This project template aims to provide much of the complex boiler plate required to build a 3rd party, embeddable JS application running in many different browsers (old, new, desktop, and mobile). This template creates an app that is both modular and completely self-contained (leaks no global variables). It is structured as a [Backbone](http://documentcloud.github.io/backbone/) app using [Browserify](http://browserify.org/) for dependency injection and modularization. This app intentionally excludes jQuery to keep the App size to an absolute minimum. To accomodate the lack of jQuery, [Backbone Views](http://documentcloud.github.io/backbone/#View) in this app are descendents of [Backbone.NativeView](https://github.com/akre54/Backbone.NativeView) which allows Backbone Views to operate using only native JavaScript functionality (ie. no jQuery). This limits the app to functioning only in IE8 or greater. In addition, this project defines a custom [domReady](app/scripts/domReady.js) library based on [jQuery.ready](http://api.jquery.com/ready/) to detect when the DOM is ready in a robust way (without jQuery).

#### App Structure

The root scripts [directory](app/scripts) contains the app entry point [main.js](app/scripts/main.js), some utility libs, and [wrapper.js](app/scripts/wrapper.js).

The wrapper.js file is a shell into which the rest of the app is concatenated at build time. This wrapper allows the app to encapsulate the Browserify `require` function and other app-wide objects without leaking anything to the global (window) scope. As a 3rd party JS script, it is imperative that global scope is never leaked so that there is no potential confict with other JS scripts running on the site this app is injected into.

#### Models, Views, and Mixins

The core functionality of App is broken into [Models](app/scripts/models), [Views](app/scripts/views), and [Mixins](app/scripts/mixins). In this application every Model has an associated View (and vice-versa).

##### Models

Models encompass the data (and data manipulation) associated with some component of the page. The Model may fire events to notify it's View of changes to it's data. Backbone [automatically fires](http://documentcloud.github.io/backbone/#Events-catalog) such events, when attributes are changed. All Models in this App descend from [BaseModel](app/scripts/models/BaseModel.js) which defines common functionality for all Models.

##### Views

Views encompass a specific DOM element (and its decendents) on the page. The View is responsible for responding to any events enacted within its element and informing its associated model of any relevant changes in state. The View is also responsible for responding to changes in it's Model's data. All Views in this App descend from [BaseView](app/scripts/views/BaseView.js) which defines common functionality for all Views.

##### Mixins

Mixins encompass functionality that can be "mixed-in" to either a Model or a View. For example the [Logging](app/scripts/mixins/Logging.js) mixin exposes logging capability. Because both BaseModel and BaseView `extend(Logging)` any descendent of those objects will be able to call the logging methods directly.

Example:
```
var MyModel = BaseModel.extend({});
var mm = new MyModel();
mm.log('lol'); // This works even though there is no 'log' function defined in BaseModel directly.
```

#### Styles
All styling for this app is in plain CSS all currently housed in [styles](app/styles).

Currently this template doesn't do any kind of cleanslating of it's styles, as the styles inteded to be overriden by clients directly. This will likely change in the near future.

#### Unit Tests

A suite of Unit Tests have been written in the [test directory](test) for every Model, View, and Mixin. The tests are written using the [Mocha](http://visionmedia.github.io/mocha/) framework. For any newly added or changed functionality added, a unit test should be created. Tests can be run in the browser by running `grunt serve:test` or `grunt test` to run in phantomjs (headless browser).

## Installation
The dependencies of this template are managed by [NPM](https://www.npmjs.org/) and [Bower](http://bower.io/). If you don't have these already, download and install [NodeJS](http://nodejs.org/) this will include NPM. Once installed, you need to install the [grunt](http://gruntjs.com/) command line tools globally by running `npm install -g grunt-cli` from a terminal. You'll also need to install bower with `npm install -g bower`. With those tools installed, fork/clone this repo to a directory on your local machine. Finally, from the root directory of this project run `npm install`. This will install all remaining server dependencies. To install client-side dependencies run `bower install`. The app installation is now complete.

## Running the App
To run a copy of the app locally  simply run: `grunt serve` from the root directory. This will build a Dev version of the app (not minified) and open up a browser pointing to the sample page. If you make any changes to code, markup, or styles, the app will automatically be rebuilt and the browser will update with the changes.

To run a built version of the app (minified) run: `grunt serve:dist`.

To just build the app without displaying it run: `grunt build`. The build output will be placed in the `/dist` directory.

## Git Hooks
Running this app will automatically set up a Git [hook](http://git-scm.com/book/en/Customizing-Git-Git-Hooks) that will validate the code style of every file in the project using [JSCS](https://github.com/jscs-dev/node-jscs) and [JSHint](http://www.jshint.com/docs/). If either of these detect code style errors, the commit will be aborted. The pre-commit hook will also run all the unit tests. If any of the tests fail, the commit will be aborted.

## Deployment
This template comes pre-configured to deploy the app to Amazon S3. In order to run the grunt task that deploys the front-end code, copy the [config/aws/s3config.json.sample](config/aws/s3config.json.sample) file to "config/aws/s3config.json and fill in your AWS credentials.

NEVER add your copy of this file to the repository as it can open your network up to a major security breach.

Once that is set up, you can deploy a new version of the App by running:
```
grunt deploy --release-version=<version number>
```

This will build the production version of the app and upload the associated files to the configured S3 bucket under a directory with the version number specified in the grunt task ex: "myapp/v1/.

## Copyright and license

Code copyright 2014 Christian Johannessen. Code released under [the MIT license](https://github.com/ceejtron/3PJS/blob/master/LICENSE).

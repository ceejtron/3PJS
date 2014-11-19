/*global AppEnvironment */

// Initialize the App
require('helpers/init').init();

var domReady = require('helpers/domReady');
var AppModel = require('models/AppModel');
var AppView = require('views/AppView');
var Backbone = require('backbone');
var AppLog = AppEnvironment.AppLog;


domReady().then(function () {

    if (AppEnvironment.unitTestMode) {
        document.head.insertAdjacentHTML('beforeBegin', '<link rel="stylesheet" href="bower_components/mocha/mocha.css">');
        document.body.insertAdjacentHTML('beforeBegin', '<div id="mocha"></div>');
        document.querySelector('.sample-app').style.display = 'none';
        document.body.style.background = 'inherit';
    }

    try {

        AppEnvironment.mainAppModel = new AppModel();

        AppEnvironment.mainAppView = new AppView({
            model : AppEnvironment.mainAppModel,
            el : document.querySelector('.sample-app')
        });

        AppEnvironment.mainAppView.render();

        if (AppEnvironment.unitTestMode) {
            AppLog.log('Running tests...');
            window.mocha.run();
        }
    }
    catch (e) {
        AppLog.error(e.stack);
    }
});

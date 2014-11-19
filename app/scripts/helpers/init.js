/*global AppEnvironment */

var utils = require('helpers/url');
var Logging = require('mixins/Logging');
var Backbone = require('backbone');
require('backbone.nativeview');
var AppLog = new (Backbone.Model.extend(Logging))();

module.exports = {
    init : function () {
        // Expose the environment in debug mode.
        if (AppEnvironment.debug || utils.getURLParameter('3PJS-debug') === 'true') {
            AppEnvironment.debug = true;
            window.AppEnvironment = AppEnvironment;
        }

        // Allow storage of logs for later retrieval
        AppEnvironment.storeLogs = utils.getURLParameter('3PJS-store-logs') === 'true';

        AppEnvironment.WindowView = new Backbone.NativeView({ el : window });
        AppEnvironment.AppLog = AppLog;
    }
};

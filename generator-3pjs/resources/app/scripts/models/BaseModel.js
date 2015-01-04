var Backbone = require('backbone');
var Logging = require('mixins/Logging');
var _ = require('underscore');

module.exports = Backbone.Model.extend({
    defaults : {
        name : 'BaseModel'
    },
    constructor : function (options) {
        // Allow creators of models to register listeners at object creation.
        if (options && options.listenTo) {
            _(options.listenTo).each(_(function (config, event) {
                config.listener.listenTo(this, event, config.callback);
            }).bind(this));
            delete options.listenTo;
        }
        Backbone.Model.apply(this, arguments);
    }
    // Base functionality goes here
}).extend(Logging);

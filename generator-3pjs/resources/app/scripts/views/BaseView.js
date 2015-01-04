var Backbone = require('backbone');
var Logging = require('mixins/Logging');
var _ = require('underscore');
require('backbone.nativeview');

module.exports = Backbone.NativeView.extend({
    name : 'BaseView',
    parent : null,
    constructor : function (options) {
        // Always save the parent property if present
        this.parent = options ? options.parent : null;

        // Allow creators of views to register listeners at object creation.
        if (options && options.listenTo) {
            _(options.listenTo).each(_(function (config, event) {
                config.listener.listenTo(this, event, config.callback);
            }).bind(this));
        }

        // Allow creators of views to proxy all events from the created view.
        if (options && options.eventProxy) {
            options.eventProxy.listenTo(this, 'all', proxyEvents);
        }

        Backbone.NativeView.apply(this, arguments);
    },
    initialize : function () {
        // Do stuff
    },
    getAttribute : function (attrName, el) {
        el = el || this.el;
        return attrName in el ? el[attrName] : el.getAttribute(attrName);
    },
    setAttribute : function (attr, attrValue, el) {
        el = el || this.el;
        if (attr in el) {
            el[attr] = attrValue;
        }
        else {
            el.setAttribute(attr, attrValue);
        }
    },
    addClass : function (className, el) {
        el = el || this.el;
        var classes = el.className;
        var classArray = classes ? classes.split(' ') : [];
        var result = _(classArray).union([className]);

        el.className = result.join(' ');
    },
    removeClass : function (className, el) {
        el = el || this.el;
        var classes = el.className;
        var classArray = classes.split(' ');
        var result = _(classArray).without(className);

        el.className = result.join(' ');
    },
    textContent : function (el) {
        el = el || this.el;
        return el.textContent ? el.textContent : el.innerText;
    }

}).extend(Logging);

// Private helper for proxying events
function proxyEvents () {
    var args = Array.prototype.slice.call(arguments);
    this.trigger.apply(this, args);
}

/*global AppEnvironment  */
var BaseView = require('views/BaseView');
var _ = require('underscore');
var sampleTemplate = require('templates/sample').sample;
var isOldIE = require('helpers/ie');

module.exports = BaseView.extend({
    model : null,
    name : 'AppView',

    initialize : function (config) {
    },
    render : function () {
        var templateData = this.model.toJSON();
        this.el.innerHTML = sampleTemplate(templateData);
    }
});

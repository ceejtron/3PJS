var BaseView = require('views/BaseView');
var sampleTemplate = require('templates/sample').sample;

module.exports = BaseView.extend({
    model : null,
    name : '<%= viewName %>',

    initialize : function (config) {
        if (config) {
            // Do stuff with config if necessary
        }
    },
    render : function () {
        var templateData = this.model.toJSON();
        this.el.innerHTML = sampleTemplate(templateData);
    }
});

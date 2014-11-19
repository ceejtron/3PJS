var BaseModel = require('models/BaseModel');
var _ = require('underscore');

module.exports = BaseModel.extend({
    // Set default properties for the App
    defaults : {
        name : 'AppModel'
    },
    initialize : function (config) {
        this.set('CurrentTime', (new Date()).toTimeString());
    }
});

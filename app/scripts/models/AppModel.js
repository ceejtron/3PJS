var BaseModel = require('models/BaseModel');

module.exports = BaseModel.extend({
    // Set default properties for the App
    defaults : {
        name : 'AppModel'
    },
    initialize : function (config) {
        if (config) {
            // Do stuff with config if necessary
        }
        this.set('CurrentTime', (new Date()).toTimeString());
    }
});

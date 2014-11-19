/* global before, describe, it, AppEnvironment */
var domReady = require('helpers/domReady');
var _ = require('underscore');

describe('AppModel', function () {

    before(function (done) {
        // Use the existing AppView to avoid collisions
        domReady().then(_(function () {
            this.AppModel = AppEnvironment.mainAppModel;
            done();
        }).bind(this));
    });

    it('Should successfully create an AppModel', function () {
        this.AppModel.should.not.equal(undefined);
        this.AppModel.get('name').should.equal('AppModel');
    });

});

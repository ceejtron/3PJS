/* global before, describe, it, AppEnvironment */
var domReady = require('helpers/domReady');
var _ = require('underscore');

describe('AppView', function () {

    before(function (done) {
        // Use the existing AppView to avoid collisions
        domReady().then(_(function () {
            this.AppView = AppEnvironment.mainAppView;
            done();
        }).bind(this));
    });

    it('Should successfully create an AppView', function () {
        this.AppView.should.not.equal(undefined);
        this.AppView.el.should.not.equal(undefined);
    });

});

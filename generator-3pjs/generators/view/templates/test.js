/* global before, describe, it, AppEnvironment */
var <%= viewName %> = require('views/<%= viewName %>');

describe('<%= viewName %>', function () {

    before(function (done) {
        // Set up preconditions here
        done();
    });

    it('Should successfully create a <%= viewName %> view', function () {
        var v = new <%= viewName %>();
        v.should.not.equal(undefined);
    });

});

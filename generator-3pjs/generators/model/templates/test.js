/* global before, describe, it, AppEnvironment */
var <%= modelName %> = require('models/<%= modelName %>');

describe('<%= modelName %>', function () {

    before(function (done) {
        // Set up preconditions here
        done();
    });

    it('Should successfully create a <%= modelName %> model', function () {
        var v = new <%= modelName %>();
        v.should.not.equal(undefined);
    });

});

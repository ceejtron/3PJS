/* global before, describe, it, AppEnvironment */
var <%= mixinName %> = require('mixins/<%= mixinName %>');

describe('<%= mixinName %>', function () {

    before(function (done) {
        // Set up preconditions here
        done();
    });

    it('Should have unit tests for the <%= mixinName %> mixin', function () {
        assert(true);
    });

});

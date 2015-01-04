/* global before, describe, it */
var BaseModel = require('models/BaseModel');

describe('BaseModel', function () {

    before(function () {
        this.BaseModel = new BaseModel();
    });

    it('Should successfully create a BaseModel', function () {
        this.BaseModel.should.not.equal(undefined);
    });

});

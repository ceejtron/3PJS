/* global before, describe, assert, it, AppEnvironment, _ */
var BaseModel = require('models/BaseModel');
var BaseView = require('views/BaseView');

describe('Logging Mixin', function () {

    before(function () {
        this.BaseModel = new BaseModel();
        this.BaseView = new BaseView();
        AppEnvironment.debug = true;
        AppEnvironment.storeLogs = true;
    });

    it('Should define a log function in the BaseModel', function () {
        (typeof this.BaseModel.log).should.equal('function');
    });

    it('Should define a log function in the BaseView', function () {
        (typeof this.BaseView.log).should.equal('function');
    });

    it('Should define a global log object', function () {
        assert.deepEqual(_(AppEnvironment.logs).keys(), ['debug', 'warn', 'error']);
    });

    it('Should log debug messages', function () {
        this.BaseModel.log('Model Test1', 'debug');
        this.BaseView.log('View Test2', 'debug');
        assert(_(AppEnvironment.logs.debug).contains('Model Test1'));
        assert(_(AppEnvironment.logs.debug).contains('View Test2'));
    });

    it('Should log warning messages', function () {
        this.BaseModel.log('Model Warn Test1', 'warn');
        this.BaseView.log('View Warn Test2', 'warn');
        assert(_(AppEnvironment.logs.warn).contains('Model Warn Test1'));
        assert(_(AppEnvironment.logs.warn).contains('View Warn Test2'));
    });

    it('Should log error messages', function () {
        this.BaseModel.log('Model Error Test1', 'error');
        this.BaseView.log('View Error Test2', 'error');
        assert(_(AppEnvironment.logs.error).contains('Model Error Test1'));
        assert(_(AppEnvironment.logs.error).contains('View Error Test2'));
    });

    it('Should clear the logs when asked', function () {
        AppEnvironment.resetLogs();
        AppEnvironment.logs.debug.should.have.length(0);
        AppEnvironment.logs.warn.should.have.length(0);
        AppEnvironment.logs.error.should.have.length(0);
    });

    it('Should not allow more than 100 messages in a log', function () {
        AppEnvironment.resetLogs();
        for (var i = 0; i < 101; i++) {
            this.BaseModel.log( 'Message ' + (i + 1) );
        }
        AppEnvironment.logs.debug.should.have.length(1);
        AppEnvironment.logs.debug[0].should.equal('Message 101');
        AppEnvironment.resetLogs();
    });


});

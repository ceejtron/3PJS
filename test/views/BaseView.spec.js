/* global before, describe, it */

var BaseView = require('views/BaseView');
var callbackFired = false;
var proxyCallbackFired = false;
var Backbone = require('backbone');

describe('BaseView', function () {

    before(function () {
        // Basic Backbone Model to test listener functionality
        var Listener = Backbone.Model.extend({
            callback : function () {
                callbackFired = true;
            },
            proxyCallback : function () {
                proxyCallbackFired = true;
            }
        });

        var l = new Listener();
        l.on('proxyEvent', l.proxyCallback, l);
        this.BaseView = new BaseView({
            el : document.querySelector('#bv-test-div'),
            parent : { name : 'TestParent' },
            listenTo : {
                testEvent : {
                    listener : l,
                    callback : l.callback
                }
            },
            eventProxy : l
        });
    });

    it('Should successfully create a BaseView', function () {
        this.BaseView.should.not.equal(undefined);
    });

    it('Should set the parent property when passed', function () {
        this.BaseView.parent.should.not.equal(null);
        this.BaseView.parent.name.should.equal('TestParent');
    });

    it('Should fire configured event listeners', function () {
        this.BaseView.trigger('testEvent');
        callbackFired.should.equal(true);
    });

    it('Should proxy events when configured', function () {
        this.BaseView.trigger('proxyEvent');
        proxyCallbackFired.should.equal(true);
    });

    it('Should add and remove css classes', function () {
        this.BaseView.addClass('test-class-1');
        this.BaseView.el.className.should.equal('test-class-1');
        this.BaseView.addClass('test-class-1');
        this.BaseView.el.className.should.equal('test-class-1');
        this.BaseView.addClass('test-class-2');
        this.BaseView.el.className.should.equal('test-class-1 test-class-2');
        this.BaseView.removeClass('test-class-2');
        this.BaseView.el.className.should.equal('test-class-1');
        this.BaseView.removeClass('test-class-1');
        this.BaseView.el.className.should.equal('');
        this.BaseView.removeClass('test-class-1');
        this.BaseView.el.className.should.equal('');
    });

});

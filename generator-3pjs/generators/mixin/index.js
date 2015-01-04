var generators = require('yeoman-generator');
var util = require('util');

module.exports = generators.NamedBase.extend({
    writing : {
        projectFiles : function () {
            var mixinName = this.name;
            var mixinFile = util.format('app/scripts/mixins/%s.js', mixinName);
            var testFile = util.format('test/mixins/%s.spec.js', mixinName);
            this.log('Generating mixin files...');
            this.fs.copyTpl(this.templatePath('mixin.js'), this.destinationPath(mixinFile));
            this.fs.copyTpl(this.templatePath('test.js'), this.destinationPath(testFile), {
                mixinName : mixinName
            });
        }
    },
    end : {
        endMessage : function () {
            this.log('Mixin generated!');
        }
    }
});

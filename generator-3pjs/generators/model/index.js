var generators = require('yeoman-generator');
var util = require('util');

module.exports = generators.NamedBase.extend({
    writing : {
        projectFiles : function () {
            var modelName = this.name;
            var modelFile = util.format('app/scripts/models/%s.js', modelName);
            var testFile = util.format('test/models/%s.spec.js', modelName);
            this.log('Generating model files...');
            this.fs.copyTpl(this.templatePath('model.js'), this.destinationPath(modelFile), {
                modelName : modelName
            });
            this.fs.copyTpl(this.templatePath('test.js'), this.destinationPath(testFile), {
                modelName : modelName
            });
        }
    },
    end : {
        endMessage : function () {
            this.log('Model generated!');
        }
    }
});

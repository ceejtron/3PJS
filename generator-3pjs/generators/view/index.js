var generators = require('yeoman-generator');
var util = require('util');

module.exports = generators.NamedBase.extend({
    writing : {
        projectFiles : function () {
            var viewName = this.name;
            var viewFile = util.format('app/scripts/views/%s.js', viewName);
            var testFile = util.format('test/views/%s.spec.js', viewName);
            this.log('Generating view files...');
            this.fs.copyTpl(this.templatePath('view.js'), this.destinationPath(viewFile), {
                viewName : viewName
            });
            this.fs.copyTpl(this.templatePath('test.js'), this.destinationPath(testFile), {
                viewName : viewName
            });
        }
    },
    end : {
        endMessage : function () {
            this.log('View generated!');
        }
    }
});

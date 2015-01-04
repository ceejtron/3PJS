var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
    initializing : {
        paths : function () {
            this.sourceRoot(__dirname + '../../../resources');
        }
    },
    writing : {
        projectFiles : function () {
            this.log('Generating project files...');
            this.fs.copy(this.templatePath('.*'), this.destinationPath());
            this.fs.copy(this.templatePath('**/*'), this.destinationPath());
        }
    },
    install : {
        dependencies : function () {
           this.installDependencies();
        }
    },
    end : {
        endMessage : function () {
            this.log('Project generated!');
        }
    }
});

var path = require('path');
var util = require('util');
var through = require('through');
var falafel = require('falafel');

module.exports = function () {
    return {
        options : {
            // We have to alias underscore because of the underscore template compilation.
            alias : ['<%= yeoman.app %>/bower_components/underscore/underscore:underscore'],
            browserifyOptions : {
                extension : '.html'
            },
            transform : [nicePaths, 'debowerify', 'browserify-compile-templates']
        },
        server : {
            files : {
                '.tmp/scripts/main.js' : ['<%= yeoman.app %>/scripts/main.js']
            }
        },
        test : {
            files : {
                '.tmp/scripts/main.js' : [
                    'test/**/*.spec.js',
                    'app/scripts/main.js'
                ]
            }
        },
        dist : {
            files : {
                '.tmp/main-built.js' : ['<%= yeoman.app %>/scripts/main.js']
            }
        }
    };

    // Rename all the things so we can have convenient require paths.
    function nicePaths (file) {

        if (!/\.(js|jsx|(lit)?coffee(\.md)?|ls|ts)$/.test(file)) {
            return through();
        }
        var data = '';

        var tr = through(write, end);
        return tr;

        function write (buf) {
            data += buf;
        }

        function end () {
            var output;
            try {
                output = parse();
            }
            catch (err) {
                tr.emit('error', new Error(
                            err.toString().replace('Error: ', '') + ' (' + file + ')')
                );
            }

            finish(output);
        }

        function finish (output) {
            tr.queue(String(output));
            tr.queue(null);
        }

        function parse () {
            var output = falafel(data, function (node) {
                if (node.type === 'CallExpression' && node.callee.type === 'Identifier' && node.callee.name === 'require') {
                    var pth = node.arguments[0].value;
                    var newPath;
                    if (!pth) {
                        return;
                    }
                    if (pth.match(/^(helpers|mixins|models|views)\/.+/)) {
                        newPath = process.cwd() + '/app/scripts/' + pth;
                    }
                    else if (pth.match(/^templates\/.+/)) {
                        newPath = process.cwd() + '/app/' + pth + '.html';
                    }
                    else {
                        return;
                    }
                    node.arguments[0].update( JSON.stringify(newPath) );
                }
            });

            return output;
        }
    }
};


var SERVER_PORT = 9000;
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};
var connectGzip = require('connect-gzip');

//CORS middleware
var allowCrossDomain = function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    next();
}

module.exports = function (grunt, yeomanConfig, LIVERELOAD_PORT) {
    var lrSnippet = require('connect-livereload')({ port : LIVERELOAD_PORT });

    return {
        options : {
            port : grunt.option('port') || SERVER_PORT,
            // change this to '0.0.0.0' to access the server from outside
            hostname : '0.0.0.0'
        },
        livereload : {
            options : {
                middleware : function (connect) {
                    return [
                        allowCrossDomain,
                        lrSnippet,
                        mountFolder(connect, '.tmp'),
                        mountFolder(connect, yeomanConfig.app)
                    ];
                }
            }
        },
        test : {
            options : {
                port : 9001,
                middleware : function (connect) {
                    return [
                        lrSnippet,
                        mountFolder(connect, '.tmp'),
                        mountFolder(connect, yeomanConfig.app)
                    ];
                }
            }
        },
        dist : {
            options : {
                middleware : function (connect) {
                    return [
                        allowCrossDomain,
                        mountFolder(connect, yeomanConfig.dist),
                        connectGzip.gzip()
                    ];
                }
            }
        }
    };
}

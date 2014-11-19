/*jshint scripturl: true */
var LIVERELOAD_PORT = 35729;
var Handlebars = require('handlebars');

module.exports = function (grunt) {
    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // configurable paths
    var yeomanConfig = {
        app : 'app',
        dist : 'dist'
    };

    grunt.initConfig({
        yeoman : yeomanConfig,
        watch : require('./config/grunt/watch')(grunt, LIVERELOAD_PORT),
        connect : require('./config/grunt/connect')(grunt, yeomanConfig, LIVERELOAD_PORT),
        jscs : require('./config/grunt/jscs')(grunt),
        aws_s3 : require('./config/grunt/aws_s3')(grunt),
        githooks : {
            options : {
                dest : '../.git/hooks'
            },
            all : {
                'pre-commit' : 'style test'
            }
        },
        open : {
            server : {
                path : 'http://localhost:<%= connect.options.port %>?3PJS-debug=true'
            },
            test : {
                path : 'http://localhost:<%= connect.test.options.port %>'
            }
        },
        clean : {
            dist : ['.tmp', '<%= yeoman.dist %>/*'],
            server : '.tmp'
        },
        jshint : {
            options : {
                jshintrc : '.jshintrc',
                reporter : require('jshint-stylish')
            },
            all : [
                'Gruntfile.js',
                '<%= yeoman.app %>/scripts/{,*/}*.js',
                '!<%= yeoman.app %>/scripts/wrapper.js',
                'test/{,*/}*.js',
                '!test/mochaInit.js',
                '!test/chaiInit.js'
            ]
        },
        copy : {
            dist : {
                files : [
                    {
                        src : '<%= yeoman.app %>/index.html',
                        dest : '<%= yeoman.dist %>/index.html'
                    }
                ]
            }
        },
        mocha : {
            test : {
                options : {
                    urls : ['http://localhost:<%= connect.test.options.port %>'],
                    run : false,
                    logErrors : true,
                    log : true
                }
            }
        },
        uglify : {
            dist : {
                files : [
                    {
                        src : '.tmp/main-built.js',
                        dest : '<%= yeoman.dist %>/scripts/main.js'
                    },
                    {
                        src : '.tmp/main-dynamic-built.js',
                        dest : '<%= yeoman.dist %>/scripts/main-dynamic.js'
                    }
                ]
            }
        },
        cssmin : {
            dist : {
                files : {
                    '<%= yeoman.dist %>/styles/theme1.css' : [
                        '.tmp/styles/{,*/}style.css',
                        '<%= yeoman.app %>/styles/{,*/}style.css'
                    ]
                }
            }
        },
        concat : {
            test : {
                src : [
                    'app/bower_components/mocha/mocha.js',
                    'test/mochaInit.js',
                    'app/bower_components/chai/chai.js',
                    'test/chaiInit.js',
                    '.tmp/scripts/main.js'
                ],
                dest : '.tmp/scripts/main.js'
            }
        },
        browserify : require('./config/grunt/browserify')(grunt, yeomanConfig)
    });

    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['build', 'copy', 'open:server', 'connect:dist:keepalive']);
        }

        if (target === 'test') {
            return grunt.task.run([
                'clean:server',
                'browserify:test',
                'build-wrapper:test',
                'concat:test',
                'connect:test',
                'open:test',
                'watch'
            ]);
        }

        grunt.task.run([
            'githooks',
            'clean:server',
            'browserify:server',
            'build-wrapper:server',
            'connect:livereload',
            'open:server',
            'watch'
        ]);
    });

    grunt.registerTask('test', function (isConnected) {
        isConnected = Boolean(isConnected);
        var testTasks = [
            'clean:server',
            'browserify:test',
            'build-wrapper:test',
            'concat:test',
            'connect:test',
            'mocha:test'
        ];

        if (!isConnected) {
            return grunt.task.run(testTasks);
        }
        else {
            // already connected so not going to connect again, remove the connect:test task
            testTasks.splice(testTasks.indexOf('connect:test'), 1);
            return grunt.task.run(testTasks);
        }
    });

    grunt.registerTask('build', [
        'clean:dist',
        'copy:dist',
        'browserify:dist',
        'build-wrapper:dist',
        'uglify',
        'cssmin'
    ]);

    grunt.registerTask('deploy', function (clean) {
        var tasks;
        if (!clean) {
            tasks = [
                'build',
                'aws_s3:production'
            ];
        }
        else {
            tasks = [
                'aws_s3:cleanProduction'
            ];
        }
        grunt.task.run(tasks);
    });

    grunt.registerTask('default', [
        'jshint',
        'test',
        'build'
    ]);

    grunt.registerTask('build-wrapper', function (target) {
        var wrapperTmpl = Handlebars.compile(grunt.file.read(yeomanConfig.app + '/scripts/wrapper.js'));
        var mainDestFile = target === 'server' || target === 'test' ? '.tmp/scripts/main.js' : '.tmp/main-built.js';

        [mainDestFile].forEach(function (destFile) {
            grunt.file.write(destFile, wrapperTmpl({
                buildOutput : grunt.file.read(destFile),
                testMode : (target === 'test').toString()
            }));
        });
    });

    grunt.registerTask('style', [
        'jscs',
        'jshint'
    ]);
};

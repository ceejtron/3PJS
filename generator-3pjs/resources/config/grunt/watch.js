module.exports = function (grunt, LIVERELOAD_PORT) {
    return {
        options : {
            nospawn : true,
            livereload : LIVERELOAD_PORT
        },
        livereload : {
            files : [
                '<%= yeoman.app %>/*.html',
                '{.tmp,<%= yeoman.app %>}/styles/{,*/}*.css',
                '{.tmp,<%= yeoman.app %>}/scripts/{,*/}*.js',
                '{.tmp,<%= yeoman.app %>}/templates/**/*.html',
                'test/spec/**/*.js'
            ]
        },
        scripts : {
            files : [
                '<%= yeoman.app %>/scripts/{,*/}*.js',
                '<%= yeoman.app %>/templates/**/*.html'
            ],
            tasks : [
                'clean:server',
                'browserify:server',
                'build-wrapper:server'
            ]
        }
    };
}

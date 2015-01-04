module.exports = function (grunt) {
    var awsConfig = grunt.file.exists('config/aws/s3config.json') ? grunt.file.readJSON('config/aws/s3config.json') : {};
    var version = 'v' + (grunt.option('release-version') || 'test');
    return {
        options : {
            accessKeyId : awsConfig.accessKey,
            secretAccessKey : awsConfig.secretKey,
            region : awsConfig.region,
            uploadConcurrency : 5, // 5 simultaneous uploads
            downloadConcurrency : 5 // 5 simultaneous downloads
        },
        production : {
            options : {
                bucket : awsConfig.bucket
            },
            files : [
                { expand : true, cwd : '<%= yeoman.dist %>', src : ['**/*'], dest : version }
            ]
        },
        cleanProduction : {
            options : {
                bucket : awsConfig.bucket
            },
            files : [
                { dest : version, action : 'delete' }
            ]
        }
    }
};

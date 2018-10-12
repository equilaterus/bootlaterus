module.exports = function (grunt) {
    const sass = require('node-sass');

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        sass: {
            options: {
                implementation: sass
            },
            dist: {
                files: {
                    'dist/css/bootlaterus.css': 'src/scss/bootlaterus.scss'
                }
            }
        },
        watch: {
            css: {
                files: 'src/**/*.scss',
                tasks: ['sass'],
                options: {
                    livereload: true,
                },
            },
        }
    });

    grunt.registerTask('default', ['sass']);
}
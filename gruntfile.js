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
        },

        browserSync: {
            bsFiles: {
                src : [
                    'dist/**/*.css',
                    '**/*.html'
                ]
            },
            options: {
                watchTask: true,
                server: {
                    baseDir: "./dist"
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.registerTask('default', ['sass', 'browserSync', 'watch']);
    grunt.registerTask('build', ['sass']);
}
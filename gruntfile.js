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

        copy: {
            main: {
                expand: true,
                cwd: 'src/html',
                src: '**',
                dest: 'dist/',
            },
        },

        watch: {
            css: {
                files: 'src/scss/*/*.scss',
                tasks: ['sass'],
                options: {
                    livereload: true,
                },
            },
            html: {
                files: 'src/html/**/*.html',
                tasks: ['copy'],
                options: {
                    livereload: true,
                },
            }
        },

        browserSync: {
            bsFiles: {
                src: [
                    'dist/**/*.css',
                    'dist/**/*.html'
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

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.registerTask('default', ['sass', 'copy', 'browserSync', 'watch']);
    grunt.registerTask('build', ['sass', 'copy']);
}
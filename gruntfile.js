module.exports = function (grunt) {
    const sass = require('node-sass');

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        clean: ['dist'],

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
                files: [
                    { expand: true, cwd: 'src/html', src: '**', dest: 'dist/' },
                    { expand: true, src: 'LICENSE', dest: 'dist/' },
                    { expand: true, cwd: 'node_modules/bootstrap/dist/js', src: '**', dest: 'dist/js/vendor/bootstrap' },
                    { expand: true, cwd: 'node_modules/bootstrap/', src: 'LICENSE*', dest: 'dist/js/vendor/bootstrap' },
                    { expand: true, cwd: 'node_modules/jquery/dist', src: '**', dest: 'dist/js/vendor/jquery' },
                    { expand: true, cwd: 'node_modules/jquery/', src: 'LICENSE*', dest: 'dist/js/vendor/jquery' }
                ], 
            },
        },

        watch: {
            css: {
                files: 'src/scss/**/*.scss',
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

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.registerTask('default', ['clean', 'sass', 'copy', 'browserSync', 'watch']);
    grunt.registerTask('build', ['clean', 'sass', 'copy']);
}
module.exports = async function (grunt) {
    const sass = require('node-sass');
    require('load-grunt-tasks')(grunt);

    // Create mappings between theme colors and templates
    const utilities = require('./utilities');    
    const bootlaterusFiles = utilities.getBootlaterusFiles('./src/scss', './prebuild/scss', '_themes', '_main.scss');
    
    grunt.initConfig({

        clean: ['dist', 'prebuild'],

        concat: {
            sccs: {
                files:  bootlaterusFiles
            }
        },

        copy: {
            main: {
                files: [
                    { expand: true, cwd: 'src/scss', src: '**', dest: 'prebuild/scss' },
                    { expand: true, cwd: 'src/html', src: '**', dest: 'dist/' },
                    { expand: true, src: 'LICENSE', dest: 'dist/' },
                    { expand: true, cwd: 'node_modules/bootstrap/dist/js', src: '**', dest: 'dist/js/vendor/bootstrap' },
                    { expand: true, cwd: 'node_modules/bootstrap/', src: 'LICENSE*', dest: 'dist/js/vendor/bootstrap' },
                    { expand: true, cwd: 'node_modules/jquery/dist', src: '**', dest: 'dist/js/vendor/jquery' },
                    { expand: true, cwd: 'node_modules/jquery/', src: 'LICENSE*', dest: 'dist/js/vendor/jquery' }
                ], 
            },
        },

        sass: {
            options: {
                implementation: sass
            },
            dist: {
                files: {
                    'dist/css/bootlaterus.css': 'prebuild/scss/bootlaterus/bootlaterus.scss',
                    'dist/css/bootlaterus-docs.css': 'prebuild/scss/bootlaterus-docs/bootlaterus-docs.scss'
                }
            }
        },

        cssmin: {
            options: {
                sourceMap: true
            },
            target: {
              files: [{
                expand: true,
                cwd: 'dist/css',
                src: ['*.css', '!*.min.css'],
                dest: 'dist/css',
                ext: '.min.css'
              }]
            }
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

    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.registerTask('default', ['clean', 'concat', 'copy', 'sass', 'cssmin', 'browserSync', 'watch']);
    grunt.registerTask('build', ['clean', 'concat', 'copy', 'sass', 'cssmin']);
}
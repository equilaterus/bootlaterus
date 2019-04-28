module.exports = function (grunt) {
    const sass = require('node-sass');
    require('load-grunt-tasks')(grunt);

    // Create mappings between theme colors and templates
    let bootlaterusFiles = {}
    bootlaterusFiles['src/scss/base/bootlaterus.scss'] = ['src/scss/_themes/_default.scss', 'src/scss/base/_bootlaterus.scss'];
    bootlaterusFiles['src/scss/docs/bootlaterus-docs.scss'] = ['src/scss/_themes/_default.scss', 'src/scss/docs/_bootlaterus-docs.scss'];
    
    grunt.initConfig({

        clean: ['dist'],

        concat: {
            sccs: {
                files:  bootlaterusFiles
            }
        },

        sass: {
            options: {
                implementation: sass
            },
            dist: {
                files: {
                    'dist/css/bootlaterus.css': 'src/scss/base/bootlaterus.scss',
                    'dist/css/bootlaterus-docs.css': 'src/scss/docs/bootlaterus-docs.scss'
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
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.registerTask('default', ['clean', 'concat', 'sass', 'copy', 'cssmin', 'browserSync', 'watch']);
    grunt.registerTask('build', ['clean', 'concat', 'sass', 'copy', 'cssmin']);
}
module.exports = async function (grunt) {
    const sass = require('node-sass');
    require('load-grunt-tasks')(grunt);

    // Create mappings between theme colors and templates
    const utilities = require('./utilities');    
    const bootlaterusFiles = utilities.getBootlaterusFiles('./src/scss', './prebuild/scss', '_themes', '_main.scss');
    const distFiles = utilities.getBootlaterusDistFiles('./dist/css',bootlaterusFiles);
        
    grunt.initConfig({

        clean: ['dist', 'prebuild'],

        concat: {
            sccs: {
                files:  bootlaterusFiles
            }
        },

        copy: {
            prebuild: {
                files: [
                    { expand: true, cwd: 'src/scss', src: '**', dest: 'prebuild/scss' },
                ],
            },
            main: {
                files: [                   
                    { expand: true, cwd: 'src/html', src: '**', dest: 'dist/' },
                    { expand: true, src: 'LICENSE', dest: 'dist/' },
                    { expand: true, cwd: 'node_modules/bootstrap/', src: 'LICENSE', dest: 'dist/', rename: () => ('dist/LICENSE-BOOTSTRAP') }
                ], 
            },
        },

        sass: {
            options: {
                implementation: sass
            },
            dist: {
                files: distFiles
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
    grunt.registerTask('default', ['clean', 'concat', 'copy:prebuild', 'copy', 'sass', 'cssmin', 'browserSync', 'watch']);
    grunt.registerTask('build', ['clean', 'concat', 'copy:prebuild', 'copy', 'sass', 'cssmin']);
}
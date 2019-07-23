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
            sass: {
                files:  bootlaterusFiles
            },
            jsutils: {
                options: {
                  process: function(src, filepath) {
                      return src.replace(
                          '$BUILD_THEMES',
                          utilities.getThemesMetadata(distFiles)
                        );
                  }
                },
                src: ['src/html/samples/util.js'],
                dest: 'dist/samples/util.js'
                
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
                    { expand: true, cwd: 'src/html', src: '**/*.html', dest: 'dist/' },
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
            scss: {
                files: 'src/scss/**/*.scss',
                tasks: ['concat:sass', 'copy:prebuild', 'sass', 'cssmin'],
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
            },
            js: {
              files: 'src/html/**/*.js',
              tasks: ['concat'],
              options: {
                  livereload: true,
              }
            }
        },

        browserSync: {          
            bsFiles: {
                src: [
                    'dist/**/*.css',
                    'dist/**/*.html',
                    'dist/**/*.js',
                ]
            },
            options: {
                watchTask: true,
                injectChanges: false,
                reloadThrottle: 5000,
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
    grunt.registerTask('default', ['clean', 'concat:sass', 'copy:prebuild', 'copy', 'concat:jsutils', 'sass', 'cssmin', 'browserSync', 'watch']);
    grunt.registerTask('build', ['clean', 'concat:sass', 'copy:prebuild', 'copy', 'concat:jsutils', 'sass', 'cssmin']);
}

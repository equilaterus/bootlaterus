module.exports = async function (grunt) {
    const sass = require('node-sass');
    require('load-grunt-tasks')(grunt);

    // Create mappings between theme colors and templates
    const utilities = require('./utilities');    
    const bootlaterusFiles = utilities.getBootlaterusFiles('./src/scss', './prebuild/scss', '_themes', '_main.scss');
    const distFiles = utilities.getBootlaterusDistFiles('./dist/css',bootlaterusFiles);

    // Create mappings for html files
    const srcHtmlPath = './src/html';
    const htmlFiles = utilities.getFilenamesFromDirectory(srcHtmlPath, '.html')
              .concat(utilities.getFilenamesFromDirectory(`${srcHtmlPath}/samples`, '.html'));
    const htmlDistFiles = utilities.getHtmlDistFiles(htmlFiles, srcHtmlPath, './dist');    
    
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
                
            },
            html: {
                options: {
                  process: function(src, filepath) {
                    const tags = utilities.getRenderTags(src);
                    tags.forEach(tag => {
                      const fragmentFile = utilities.getSrcFromTag(tag);
                      const fragmentHtml = utilities.getFile(srcHtmlPath, fragmentFile);
                      src = src.replace(new RegExp(tag, 'g'), fragmentHtml);
                    });
                    return src;
                  }
                },
                files: htmlDistFiles
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
                    { expand: true, cwd: 'src/html/content', src: '**/*.*', dest: 'dist/content' },
                    { expand: true, src: 'LICENSE', dest: 'dist/' },
                    { expand: true, cwd: 'node_modules/bootstrap/', src: 'LICENSE', dest: 'dist/', rename: () => ('dist/LICENSE-BOOTSTRAP') }
                ], 
            },
        },

        babel: {
            options: {
              sourceMap: true,
              presets: ['@babel/preset-env']
            },
            dist: {
              files:[
                  {
                    expand: true,
                    cwd: 'src/html',
                    src: ['**/*.js'],
                    dest: 'dist/'
                    }
                ]
            }
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

        uglify: {
            jsfiles: {
                files: [{
                    expand: true,
                    src: ['dist/**/*.js', '!dist/**/*.min.js'],
                    dest: '.',
                    cwd: '.',
                    rename: function (dst, src) {
                       return dst + '/' + src.replace('.js', '.min.js');
                    }
                }]
            }
        },

        watch: {
            scss: {
                files: 'src/scss/**/*.scss',
                tasks: ['concat:sass', 'copy:prebuild', 'sass', 'cssmin']
            },
            html: {
                files: 'src/html/**/*.html',
                tasks: ['concat:html', 'copy']
            },
            js: {
              files: 'src/html/**/*.js',
              tasks: ['concat']
            }
        },

        browserSync: {          
            bsFiles: {
                src: [
                    'dist/**/*.min.css',
                    'dist/**/*.html',
                    'dist/**/*.js',
                ]
            },
            options: {
                watchTask: true,
                injectChanges: false,
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
    grunt.loadNpmTasks('grunt-babel');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.registerTask('default', ['clean', 'concat:sass', 'concat:html', 'copy:prebuild', 'copy', 'concat:jsutils', 'sass', 'cssmin', 'babel', 'browserSync', 'watch']);
    grunt.registerTask('build', ['clean', 'concat:sass', 'concat:html', 'copy:prebuild', 'copy', 'concat:jsutils', 'sass', 'cssmin', 'babel']);
}

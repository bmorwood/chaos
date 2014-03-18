var LIVERELOAD_PORT = 35729;
var SERVER_PORT = 9000;
var lrSnippet = require('connect-livereload')({port: LIVERELOAD_PORT});
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function(grunt) {

    // show elapsed time at the end
    require('time-grunt')(grunt);
    // load all grunt tasks
    require('load-grunt-tasks')(grunt);

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today(\'yyyy-mm-dd\') %> */\n'
            },
            build: {
                src: '<%= pkg.buildPath %>js/<%= pkg.name %>.min.js',
                dest: '<%= pkg.buildPath %>js/<%= pkg.name %>.min.js'
            }
        },
        concat:{
            core:{
                options: {
                    footer: '}(window));'
                },
                src: [
                    'vendors/jquery.js',
                    'vendors/**/*.js',
                    'app/index.js',
                    'app/core/Chaos.js',
                    'app/core/*.js',
                    'app/**/*.js',
                    '.tmp/*.js',
                ],
                dest: '<%= pkg.buildPath %>js/<%= pkg.name %>.min.js'
            }
        },
        less:{
            options:{
                ieCompact:false,
                yuicompress: true,
                compress: true
            },
            base:{
                files: {
                    '<%= pkg.buildPath %>css/default.css': 'css/**/*.less'
                }
            }
        },
        copy: {
            main: {
                files: [
                    {src: 'index.html', dest: '<%= pkg.buildPath %>'},
                    {src: ['css/**/*', '!css/**/*.less'], dest: '<%= pkg.buildPath %>'},
                    {src: 'locales/**/*', dest: '<%= pkg.buildPath %>'}
                ]
            },
            release: {
                files: [
                    {expand: true, cwd: '<%= pkg.buildPath %>/', src: ['**'], dest: '<%= pkg.releasePath %>/'}
                ]
            }
        },
        clean: {
            build: {
                src: ['<%= pkg.buildPath %>']
            },
            release: {
                src: ['<%= pkg.releasePath %>']
            }
        },
        imagemin: {
            release: {
                files: [{
                    expand: true,
                    cwd: '<%= pkg.releasePath %>css/imgs/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: '<%= pkg.releasePath %>css/imgs/'
                }]
            }
        },
        handlebars: {
            compile: {
                options: {
                    namespace: '<%= pkg.nameSpace %>.templates',
                    processName: function(filePath) { // input:  **/*.html
                        var pieces = filePath.split('/');
                        return pieces[pieces.length - 1]; // output: *.html
                    }
                },
                files: {
                    '.tmp/template-data.js': 'app/**/*.html'
                }
            }
        },
        watch: {
            livereload: {
                options: {
                    livereload: {port: LIVERELOAD_PORT}
                },
                files: ['<%= concat.core.src %>', '*.html', 'app/**/*.html', 'css/**/*'],
                tasks: ['base']
            }
        },
        connect: {
            options: {
                port: SERVER_PORT,
                base: 'build/',
                hostname: 'localhost',
                livereload: LIVERELOAD_PORT
            },
            build:{
                options: {
                    base: 'build/'
                },
                server:{}
            },
            release:{
                options: {
                    base: 'release/'
                },
                server:{}
            }

        },
        open: {
            server: {
                path: 'http://127.0.0.1:<%= connect.options.port %>/index.html'
            }
        },
        yuidoc: {
            options: {
                paths: 'app/',
                outdir: 'docs/'
            },
            dist: {
                name: '<%= pkg.name %>',
                description: '<%= pkg.description %>',
                version: '0',
                url: 'website.com'
            }
        }
    });

    // Default task(s).
    grunt.registerTask('default', ['build']);
    grunt.registerTask('base', ['clean:build', 'copy:main', 'handlebars', 'concat', 'less']);
    grunt.registerTask('build', ['base', 'connect:build', 'open', 'watch']);
    grunt.registerTask('release', function (){
        var tasks = ['base', 'yuidoc', 'clean:release', 'uglify', 'copy:release', 'imagemin', 'connect:release', 'open', 'watch'];
        grunt.option('force', true);
        grunt.task.run(tasks);
    });

    grunt.registerTask('run', ['build', 'connect']);

};

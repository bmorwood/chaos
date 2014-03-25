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
                src: [
                    'app/core/Chaos.js',
                    'app/core/*.js',
                    'app/utils/*.js'
                ],
                dest: '<%= pkg.buildPath %>js/<%= pkg.name %>.min.js'
            }
        },
        copy: {
            main: {
                files: [
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
        watch: {
            files: ['<%= concat.core.src %>'],
            tasks: ['base']
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
    grunt.registerTask('default', ['base']);
    grunt.registerTask('base', ['clean:build', 'copy:main', 'concat']);
    grunt.registerTask('release', function (){
        var tasks = ['base', 'yuidoc', 'clean:release', 'uglify', 'copy:release'];
        grunt.option('force', true);
        grunt.task.run(tasks);
    });

};

module.exports = function(grunt) {
    /**
     * @desc localized pathname for application io asset directory structure.
     * @param {string} path - must be relative to returned output.
     * @returns {string}
     */
    var app = function(path) {
        return "../../public/"+path;
    };
    var dist = function (path) {
        return app("dist/"+path);
    };
    /**
     * @desc Grunt initialization process
     */
    grunt.initConfig({
        /**
         * @desc Handlebars - precompile Handlebars templates to JST file.
         */
        handlebars: {
            options: {
                namespace: false,
                amd: true
            },
            files: {
                expand: true,
                cwd: app('handlebars/'),
                src: ['**/*.hbs'],
                dest: dist('templates'),
                ext: '.js'
            }
        },
        /**
         * @desc JSHint - validate files with JSHint
         */
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                eqnull: true,
                browser: true,
                globals: {}
            },
            src: app('js/**/*.js')
        },
        /**
         * @desc Less - precompile Less styles to CSS
         */
        less: {
            development: {
                options: {
                  paths: [dist('css')]
                },
                files: (function() {
                    this[dist('css/theme.css')] = app('less/theme.less');
                    return this;
                }).apply({})
            }
        },
        /**
         * @desc Watch - watch task...
         */
        watch: {
            handlebars: {
                files: [app('handlebars/**/*.hbs')],
                tasks: ['newer:handlebars']
            },
            jshint: {
                files: [app('js/**/*.js')],
                tasks: ['jshint'],
                options: {
                    spawn: false,
                },
            },
            less: {
                files: [app('less/**/*.less')],
                tasks: ['less']
            }
        }
    });
    /**
     * @desc Grunt Event Tracking - provide middle layer for watch events
     */
    grunt.event.on('watch', function(action, filepath, task) {
        if(task === "jshint") return grunt.config(['jshint', 'src'], filepath);
        return;
    });
    /**
     * @desc Load tasks from the specified Grunt plugin
     */
    grunt.loadNpmTasks('grunt-contrib-handlebars');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-newer');
    /**
     * @desc default grunt task
     */
    grunt.registerTask('default', 'Default listener/watch task', function(a, b) {
        grunt.log.subhead("GRUNT TASK");
        grunt.log.ok("JSHint");
        grunt.log.ok("Handlebars");
        grunt.log.ok("Less");
        grunt.task.run('watch');
    });
}

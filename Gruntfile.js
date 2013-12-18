/* global module */

module.exports = function (grunt) {

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        // Running `grunt less` will compile once
        //"./css/style.css": "./css/style.less"
        less: {
            development: {
                    options: {
                    paths: ["./css"],
                    yuicompress: true
                },
                files: {
                    'less/main.css': 'less/main.less',
                    'less/login.css': 'less/login.less',
                    'less/admin.css': 'less/admin.less',
                }
            }
        },

        copy: {
            assets: {
                files: [
                    { expand: true, cwd: 'assets/img', src: '***', dest: 'deploy/img' }
                    //{ src: 'assets/img/avatar_default.jpg', dest: 'deploy/img/avatar_default.jpg' }
                    //{ src: 'assets/shared/img/favicon.ico', dest: 'deploy/shared/img/favicon.ico' }
                    //{ expand: true, cwd: 'assets/img/', src: '**', dest: 'deploy' }
                ]
            },
            vendor: {
                files: [
                    { src: 'vendor/html5shim.js', dest: 'deploy/core/js/html5shim.js' },
                    { src: 'vendor/json2.js', dest: 'deploy/core/js/json2.js' },
                    { src: 'vendor/jquery-1.10.2.js', dest: 'deploy/core/js/jquery-1.10.2.js' },
                    { src: 'vendor/dropzone.min.js', dest: 'deploy/core/js/dropzone.min.js' },
                    { src: 'vendor/ie7hacks.js', dest: 'deploy/core/js/ie7hacks.js' },
                    { expand: true, cwd: 'vendor/bootstrap/fonts', src: '**', dest: 'deploy/fonts' },
                    { expand: true, cwd: 'vendor/plugins/bootstrap', src: '**', dest: 'deploy/core/plugins/bootstrap' },
                    { expand: true, cwd: 'vendor/plugins/video-js', src: '**', dest: 'deploy/core/plugins/video-js' }
                ]
            },
            admin: {
                files:[
                    { src: 'apps/admin/index.html', dest:'deploy/admin/index.html' },
                    { src: 'assets/config/configuration.json', dest:'deploy/config/configuration.json' },
                    //{ expand: true, cwd: 'scripts/vendor/', src: 'jquery-1.10.2.js', dest: 'deploy/login/js/vendor' },
                    { expand: true, cwd: 'apps/admin/', src: 'img/**', dest: 'deploy' }
                    //{ expand: true, cwd: 'assets/shared', src: 'img/**/**', dest: 'deploy' }
                ]
            },
            login: {
                files:[
                    { src: 'apps/login/index.html', dest:'deploy/login/index.html' },
                    { src: 'assets/config/configuration.json', dest:'deploy/config/configuration.json' },
                    //{ expand: true, cwd: 'scripts/vendor/', src: 'jquery-1.10.2.js', dest: 'deploy/login/js/vendor' },
                    { expand: true, cwd: 'apps/login/', src: 'img/**', dest: 'deploy' }
                    //{ expand: true, cwd: 'assets/shared', src: 'img/**/**', dest: 'deploy' }
                ]
            },
            mainapp: {
                files:[
                    { src: 'apps/mainapp/index.html', dest:'deploy/index.html' },
                    { src: 'assets/config/configuration.json', dest:'deploy/config/configuration.json' },
                    { src: 'ie8-and-down.css', dest: 'deploy/styles/ie8-and-down.css'}
                    //{ expand: true, cwd: 'scripts/vendor/', src: 'jquery-1.10.2.js', dest: 'deploy/portal/js/vendor' },
                    // { expand: true, cwd: 'apps/portal/', src: 'img/**', dest: 'deploy/portal' },
                    // { expand: true, cwd: 'assets/shared', src: 'img/**/**', dest: 'deploy/portal' }
                    //{ expand: true, cwd: 'assets/images/', src: '**/**', dest: 'deploy/img/' }
                    //{ expand: true, cwd: 'assets/img/', src: 'img/**', dest: 'deploy' }
                ]
            }
        },

        // jshint: {
        //     options: {
        //         jshintrc: '.jshintrc'
        //     },
        //     all: [ 'Gruntfile.js', 'apps/**/*.js' ]
        // },

        concat: {
            login_plugins: {
                options: {
                    banner: '//concat plugins\n',
                    footer: '//end concat plugins\n'
                },
                dest: 'deploy/login/js/plugins.js',
                src: [
                    'vendor/plugins/backbone/backbone-validation.js',
                    'vendor/plugins/serialize-object.js',
                    'vendor/bootstrap/js/bootstrap.js',
                    'assets/shared/js/config/AppSettings.js',
                    'assets/shared/js/base_classes/view/ItemFadeIn.js',
                    'assets/shared/js/base_classes/model/FormValidation.js',
                    'assets/shared/js/base_classes/view/FormValidation.js'
                ]
            },
            admin_plugins: {
                options: {
                    banner: '//concat plugins\n',
                    footer: '//end concat plugins\n'
                },
                dest: 'deploy/admin/js/plugins.js',
                src: [
                    'vendor/plugins/backbone/backbone.paginator.js',
                    'vendor/plugins/backbone/backbone-validation.js',
                    'vendor/plugins/serialize-object.js',
                    'vendor/bootstrap/js/bootstrap.js',
                    'vendor/bootstrap/js/bootstrap-tooltip.js',
                    'vendor/bootstrap/js/bootstrap-confirmation.js',
                    //'vendor/bootstrap/js/bootstrap-dropdown.js',
                    'vendor/moment.js',
                    'assets/shared/js/config/AppSettings.js',
                    'assets/shared/js/base_classes/view/ItemFadeIn.js',
                    'assets/shared/js/base_classes/model/FormValidation.js',
                    'assets/shared/js/base_classes/view/FormValidation.js'
                    //'assets/shared/js/base_classes/view/RegionFadeIn.js'
                ]
            },
            mainapp_plugins: {
                options: {
                    banner: '//concat plugins\n',
                    footer: '//end concat plugins\n'
                },
                dest: 'deploy/mainapp/js/plugins.js',
                src: [
                    'vendor/plugins/backbone/backbone.paginator.js',
                    'vendor/plugins/backbone/backbone-validation.js',
                    'vendor/plugins/serialize-object.js',
                    //'vendor/plugins/dropzone-amd-module.js',
                    //'vendor/plugins/jquery/file-upload/vendor/jquery.ui.widget.js',
                    //'vendor/plugins/jquery/file-upload/jquery.fileupload.js',
                    'vendor/bootstrap/js/bootstrap.js',
                    'vendor/bootstrap/js/bootstrap-tooltip.js',
                    'vendor/bootstrap/js/bootstrap-confirmation.js',
                    //'vendor/bootstrap/js/bootstrap-dropdown.js',
                    'vendor/moment.js',
                    'assets/shared/js/config/AppSettings.js',
                    'assets/shared/js/base_classes/view/ItemFadeIn.js',
                    'assets/shared/js/base_classes/model/FormValidation.js',
                    'assets/shared/js/base_classes/view/FormValidation.js'
                    //'assets/shared/js/base_classes/view/RegionFadeIn.js'
                ]
            }
        },

        clean: [
            'deploy'
        ],

        watch: {
            login_scripts: {
                files: ['apps/login/**/*.js', 'apps/login/**/*.jst', 'vendor/**/*.js', 'assets/**/*.js'],
                tasks: ['requirejs:login', 'copy','notify:scripts'],
                options: { livereload: true }
            },
            admin_scripts: {
                files: ['apps/admin/**/*.js', 'apps/admin/**/*.jst', 'vendor/**/*.js', 'assets/**/*.js'],
                tasks: ['requirejs:admin', 'copy','notify:scripts'],
                options: { livereload: true }
            },
            mainapp_scripts: {
                files: ['apps/mainapp/**/*.js','apps/mainapp/**/*.jst', 'vendor/**/*.js'],
                tasks: ['requirejs:mainapp', 'copy', 'notify:scripts'],
                options: { livereload: true }
            },
            less : {
                files: ['less/**/*.less'],
                tasks: ['less', 'requirejs:loginCSS', 'requirejs:adminCSS', 'requirejs:mainappCSS', 'notify:less'],
                options: { livereload: true }
            },
            templates: {
                files: ['**/*.html', '!deploy/**/*.html'],
                tasks: ['copy', 'notify:templates'],
                options: { livereload: true }
            },
            copy: {
                files: ['assets/**/*.json'],
                tasks: ['copy', 'notify:copy']
                // options: {livereload: true}
            },
            conditional: {
                files: ['ie8-and-down.css'],
                tasks: ['copy', 'notify:copy']
                // options: {livereload: true}
            }
        },

        notify: {
            build: {
                options: {
                    message: 'Site built successfully.'
                }
            },
            scripts: {
                options: {
                    message: 'Scripts combined successfully.'
                }
            },
            less: {
                options: {
                    message: 'Less compiled successfully.'
                }
            },
            templates: {
                options: {
                    message: 'Templates compiled successfully.'
                }
            },
            copy: {
                options: {
                    message: 'Files copied successfully'
                }
            }
        },
        requirejs: {
            options:{
                optimize: 'none'
            },
            mainapp: {
                options: {
                    baseUrl: 'apps/mainapp',
                    mainConfigFile: 'apps/mainapp/config/require_config.js',
                    out: 'deploy/mainapp/js/main.js',
                    generateSourceMaps: false,
                    useSourceUrl: false

                }
            },
            mainapp_prod: {
                options: {
                    baseUrl: 'apps/mainapp',
                    mainConfigFile: 'apps/mainapp/config/require_config.js',
                    out: 'deploy/mainapp/js/main.js',
                    optimize: 'uglify2'
                }
            },
            mainappCSS: {
                options: {
                    optimizeCss: 'standard',
                    cssIn: 'less/main.css',
                    out: 'deploy/styles/main.min.css'
                }
            },
            login: {
                options: {
                    baseUrl: 'apps/login',
                    mainConfigFile: 'apps/login/config/require_config.js',
                    out: 'deploy/login/js/main.js',
                    generateSourceMaps: false,
                    useSourceUrl: false

                }
            },
            login_prod: {
                options: {
                    baseUrl: 'apps/login',
                    mainConfigFile: 'apps/login/config/require_config.js',
                    out: 'deploy/login/js/main.js',
                    optimize: 'uglify2'
                }
            },
            loginCSS: {
                options: {
                    optimizeCss: 'standard',
                    cssIn: 'less/login.css',
                    out: 'deploy/styles/login.min.css'
                }
            },
            admin: {
                options: {
                    baseUrl: 'apps/admin',
                    mainConfigFile: 'apps/admin/config/require_config.js',
                    out: 'deploy/admin/js/main.js',
                    generateSourceMaps: false,
                    useSourceUrl: false

                }
            },
            admin_prod: {
                options: {
                    baseUrl: 'apps/admin',
                    mainConfigFile: 'apps/admin/config/require_config.js',
                    out: 'deploy/admin/js/main.js',
                    optimize: 'uglify2'
                }
            },
            adminCSS: {
                options: {
                    optimizeCss: 'standard',
                    cssIn: 'less/admin.css',
                    out: 'deploy/styles/admin.min.css'
                }
            }
        },
        gitinfo:{},
        // compress: {
        //     options:{
        //         mode: 'tgz'
        //     },
        //     mainapp: {
        //         options:{
        //             archive: 'deploy/mainapp_'+new Date().getTime()+'_<%= gitinfo.local.branch.current.name %>_<%= gitinfo.local.branch.current.shortSHA %>.tgz'
        //         },
        //         expand: true,
        //         cwd: 'deploy',
        //         src: ['**/*']
        //     }
        // }
    });

    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-notify');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-gitinfo');
    //grunt.loadNpmTasks('grunt-contrib-compress');
    //grunt.loadNpmTasks('grunt-contrib-jshint');


    // Base build tasks
    grunt.registerTask('base', ['clean', 'concat', 'less', 'copy', 'gitinfo']);

    // Build login for development
    grunt.registerTask('login', ['base','requirejs:login','requirejs:loginCSS','notify:build']);

    // Build admin for development
    grunt.registerTask('admin', ['base','requirejs:admin','requirejs:adminCSS','notify:build']);

    // Build mainapp for development
    grunt.registerTask('mainapp', ['base','requirejs:mainapp','requirejs:mainappCSS','notify:build']);

    // Build mainapp, login and admin for development
    grunt.registerTask('dev', ['base','requirejs:login','requirejs:loginCSS','requirejs:admin','requirejs:adminCSS','requirejs:mainapp','requirejs:mainappCSS','notify:build']);

    // Build mainapp, login and admin for production
    grunt.registerTask('prod', ['base', 'requirejs:login_prod','requirejs:loginCSS','requirejs:admin_prod','requirejs:adminCSS','requirejs:mainapp_prod','requirejs:mainappCSS']);

    // Default task runs complete dev build
    grunt.registerTask('default', ['dev']);
};

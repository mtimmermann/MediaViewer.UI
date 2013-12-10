/* global require */

require.config({
    // Be very cautious when playing around with r.js. 
    // Especially when you want to optimize the whole project with r.js 
    // by adding a modules directive to your config. R.js will delete 
    // the output directory without asking. If it happens that it is 
    // accidentally configured to be your system root, r.js will erase your HDD
    // Always add keepBuildDir:true when playing around with r.js
    keepBuildDir:true,
    paths: {
        jquery: 'empty:',
        marionette: '../../vendor/backbone.marionette',
        backbone: '../../vendor/backbone',
        underscore: '../../vendor/underscore',
        //dropzone: '../../vendor/plugins/dropzone-amd-module',
        //dropzone: '../../vendor/dropzone',
        plugins: '../../deploy/mainapp/js/plugins',
        tpl: '../../vendor/plugins/require/tpl'
    },
    shim: {
        'marionette': {
            deps: ['backbone'],
            exports: 'Marionette'
        },
        'backbone': {
            deps: ['underscore'],
            exports: 'Backbone'
        },
        'underscore': {
            exports: '_'
        },
        // 'dropzone': {
        //     exports: 'DropZone'
        // },
        'plugins': {
            deps:['backbone']
        }
    },
    name: '../../vendor/almond',
    include: ['main'],
    insertRequire: ['main'],
    wrap: true,
    enforceDefine:true,
    cjsTranslate: true

});


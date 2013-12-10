/* global define */

define(function(require, exports, module) {

    var _ = require('underscore'),
        Backbone = require('backbone'),
        Marionette = require('marionette'),
        Plugins = require('plugins'),
        App = require('App'),
        AppRouter = require('routers/AppRouter'),
        AppController = require('controllers/AppController');

    // Init the app router and controller
    App.appRouter = new AppRouter({
        controller: new AppController()
    });
    window.App = App;

    $(function() {
        window.App = App;
        window.App.start();
    });
});
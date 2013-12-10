define(function(require, exports, module) {

	var App = require('App'),
		HeaderView = require('views/Header'),
        LoginView = require('views/Login'),
        RegisterView = require('views/Register'),
		AboutView = require('views/About');

    return Backbone.Marionette.Controller.extend({

        initialize: function (options) {
        	this._headerView = new HeaderView();
            App.headerRegion.show(this._headerView);
        },

        // AppRouter appRoutes

        index: function () {
            this._headerView.setActiveLink('index');
            App.mainRegion.show(new LoginView());
        },

        register: function() {
            this._headerView.setActiveLink('register');
            App.mainRegion.show(new RegisterView());
        },

        about: function() {
        	this._headerView.setActiveLink('about');
        	App.mainRegion.show(new AboutView());
        }
    });

});
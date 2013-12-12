define(function(require, exports, module) {

    var LocalAppSettings = require('config/Settings');

	var App = new Backbone.Marionette.Application();

    // function isMobile() {
    //     var userAgent = navigator.userAgent || navigator.vendor || window.opera;
    //     return ((/iPhone|iPod|iPad|Android|BlackBerry|Opera Mini|IEMobile/).test(userAgent));
    // }
    //App.mobile = isMobile();

	App.addRegions({
		headerRegion: "#header-region",
		mainRegion: "#main-region"
	});

    // App settings, combine global and local settings.
    App.settings = _.extend(AppSettings, LocalAppSettings);

    if (App.settings.getUserInfo) {
        $.ajax({
            url: App.settings.baseServiceUrl + 'user',
            type: 'GET',
            dataType: 'json',
            async: false
        }).done(function(data, textStatus, jqXHR) {
            App.settings.userInfo = _.extend({ isLoggedIn: true }, data);
        });//.fail(function(/*jqXHR, textStatus, errorThrown*/) {
            // Do nothing, allow AppController to handle this });
    }

	App.collections = {
		users: null,
        videos: null
	};

    App.Notifications = {};
    _.extend(App.Notifications, Backbone.Events);

    App.addInitializer(function () {
        Backbone.history.start();
    });

	// BaseApp.on("initialize:after", function() {
	// 	if(Backbone.history) {
	// 		Backbone.history.start();
	// 	}
	// });

	return App
});
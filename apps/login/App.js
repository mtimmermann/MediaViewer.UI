define(function(require, exports, module) {

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

    App.collections = {
        contacts: null
    };

    // App settings, global.
    App.settings = AppSettings;

    App.Notifications = {};
    _.extend(App.Notifications, Backbone.Events);

    App.addInitializer(function () {
        Backbone.history.start();
    });

    // BaseApp.on("initialize:after", function() {
    //  if(Backbone.history) {
    //      Backbone.history.start();
    //  }
    // });


    return App
});
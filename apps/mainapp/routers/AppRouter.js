define(function(require, exports, module) {

   return Backbone.Marionette.AppRouter.extend({
       //"index" must be a method in AppRouter's controller
       appRoutes: {
           '': 'index',
           'infiniteScroll': 'infiniteScroll',
           'videos/:id': 'videoDetails',
           'videos/edit/:id': 'videoEdit',
           'addVideo': 'videoAdd',
           'admin': 'admin',
           'about': 'about'
       }
   });

});
define(function(require, exports, module) {

   return Backbone.Marionette.AppRouter.extend({
       //"index" must be a method in AppRouter's controller
       appRoutes: {
           '': 'index',
           'users': 'users',
           'users/:id': 'users',
           'users/edit/:id': 'userEdit',
           'addUser': 'userAdd'
       }
   });

});
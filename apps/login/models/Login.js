define(function(require, exports, module) {

    // Login class - model
    return BaseClasses.ModelFormValidation.extend({

        //urlRoot: AppSettings.baseServiceUrl +'login',

        // initialize: function(attributes, options) { },

        defaults: {
            username: '',
            password: ''
        },

        // http://www.verious.com/code/addyosmani/backbone.validation/
        validation: {
            username: {
                required: true,
                msg: 'Username is required'
            },
            password: {
                required: true,
                msg: 'Password is required'
            }
        }

    });
});
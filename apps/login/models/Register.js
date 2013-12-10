define(function(require, exports, module) {

    // Register class - model
    return BaseClasses.ModelFormValidation.extend({

        //urlRoot: AppSettings.baseServiceUrl +'register',

        // initialize: function(attributes, options) { },

        defaults: {
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            confirmPassword: ''
        },

        // http://www.verious.com/code/addyosmani/backbone.validation/
        validation: {
            email: [
                {
                    required: true,
                    msg: 'Please enter an email address'
                },
                {
                    pattern: 'email',
                    msg: 'Please enter a valid email'
                }
            ],
            firstName: {
                required: true,
                msg: 'First Name is required'
            },
            lastName: {
                required: true,
                msg: 'Last Name is required'
            },
            password: {
                required: true,
                msg: 'Password is required'
            },
            confirmPassword: {
                required: true,
                msg: ' '
            }
        }

    });
});
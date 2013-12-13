define(function(require, exports, module) {

    /**
     * User class - model
     *
     * Extends the BaseClasses.Model.FormValidation class, which
     * extends the the Backbone.Model class.
     */
    return BaseClasses.Model.FormValidation.extend({

        urlRoot: AppSettings.baseServiceUrl +'users',

        // initialize: function(attributes, options) { },

        parse: function(data) {
            // Temporary, must fix service and ensure id is returned
            if (!data.id && data._id) {
                data.id = data._id;
            }
            return data;
        },

        defaults: {
            id: null,
            email: '',
            firstName: '',
            lastName: '',
            roles: [],
            deleted: false
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
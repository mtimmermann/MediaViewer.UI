define(function(require, exports, module) {

    /**
     * Video class - model
     *
     * Extends the BaseClasses.Model.FormValidation class, which
     * extends the the Backbone.Model class.
     */
    return BaseClasses.Model.FormValidation.extend({

        urlRoot: AppSettings.baseServiceUrl +'videos',

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
            uri: '',
            thumbnail: '',
            fileId: '',
            title: '',
            subTitle: '',
            notes: ''
        },

        validation: {
            file: {
                required: true,
                msg: 'A video file is required'
            }
        }

    });
});
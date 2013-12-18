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

            data.durationFormatted = '';
            if (data.meta && data.meta.format &&
                typeof data.meta.format.duration === 'number') {
                    data.durationFormatted = data.meta.format.duration.toFixed(2);
            }

            if (!data.meta) {
                data.meta = { format: {} };
            }
            if (!data.meta.format) {
                data.meta.format = {};
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
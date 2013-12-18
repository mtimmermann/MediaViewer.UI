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
                    data.durationFormatted = this._secsToHHMMSS(
                        parseInt(data.meta.format.duration.toFixed(0), 10));
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
        },

        // TODO: Move to shared utility if this is needed elswhere
        _secsToHHMMSS: function(secondsTotal) {
            if (typeof secondsTotal !== 'number') { throw (new Error('_secsToHHMMSS: secondsTotal param must be a number')); }
            //var sec_num = parseInt(this, 10); // don't forget the second parm
            var hours   = Math.floor(secondsTotal / 3600);
            var minutes = Math.floor((secondsTotal - (hours * 3600)) / 60);
            var seconds = secondsTotal - (hours * 3600) - (minutes * 60);

            if (hours   < 10) {hours   = "0"+hours;}
            if (minutes < 10) {minutes = "0"+minutes;}
            if (seconds < 10) {seconds = "0"+seconds;}
            var time    = hours+':'+minutes+':'+seconds;
            return time;
        }

    });
});
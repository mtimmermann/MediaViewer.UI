define(function(require, exports, module) {

    var VideoDetailsTemplate = require('tpl!templates/users/details.jst');

    /**
     * VideoDetails class - Item view
     *
     * Extends the BaseClasses.View.ItemFadeIn class, which
     * extends the the Marionette.ItemView class.
     */
    return BaseClasses.View.ItemFadeIn.extend({

        tagName: 'div',
        className: 'video-details',
        template: VideoDetailsTemplate,

        events: {
            'click [data-model-details="edit"]': 'edit'
        },

        initialize: function(options) {
            options = options || {};
            if (!options.model) {
                throw (new Error('VideoDetails View: model option is required'));
            }
            if (!options.userInfo) {
                throw (new Error('VideoDetails View: userInfo option is required'));
            }
            this._userInfo = options.userInfo;

            // Append a query timestamp to the uri, to ensure video is pulled when view is rendered.
            this.model.set('uri', this.model.get('uri') +'?t='+ new Date().getTime());
        },

        onRender: function() {
            if (this._userInfo.id === this.model.get('ownerId')) {
                this.$('[data-model-details="edit"]').removeClass('hidden');
            }
        },

        edit: function() {
            App.appRouter.navigate('#videos/edit/'+ this.model.get('id'), true);
        }
    });

});
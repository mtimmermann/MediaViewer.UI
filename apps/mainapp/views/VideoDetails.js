define(function(require, exports, module) {

    var VideoDetailsTemplate = require('tpl!templates/video_details.jst');

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

            this._player = null;
        },

        onRender: function() {
            if (this._userInfo.id === this.model.get('ownerId')) {
                this.$('[data-model-details="edit"]').removeClass('hidden');
            }
        },

        // http://daverupert.com/2012/05/making-video-js-fluid-for-rwd/
        onShow: function() {
            var self = this;

            // Initialize the videojs player, adjust the width after load
            this._player = videojs('video-viewer');
            this._player.addChild('BigPlayButton');
            this._player.ready(function() {
                // TODO: Get actual aspect ratio
                var aspectRatio = 9/16; // Make up an aspect ratio

                function resizeVideoJS() {
                  // Get the parent element's actual width
                  var width = document.getElementById(self._player.id()).parentElement.offsetWidth;
                  // Set width to fill parent element, Set height
                  self._player.width(width).height( width * aspectRatio );
                }

                resizeVideoJS(); // Initialize the function
                window.onresize = resizeVideoJS; // Call the function on resize
            });
        },

        edit: function() {
            App.appRouter.navigate('#videos/edit/'+ this.model.get('id'), true);
        }
    });

});
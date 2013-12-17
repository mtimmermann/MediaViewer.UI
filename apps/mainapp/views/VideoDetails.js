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
            'click [data-model-details="edit"]': 'edit',
            'click [data-model-details="full-screen"]': 'fullScreen'
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
            // http://stackoverflow.com/questions/18169473/video-js-size-to-fit-div
            var videoEle = this.$('#video-viewer-'+ this.model.get('id'));
            //var videoViewerId = 'video-viewer-'+ this.model.get('id');
            var videoDim = {
                width: videoEle.width(),
                height: videoEle.height()
            }

            this._player = videojs(videoEle.attr('id'));
            this._player.addChild('BigPlayButton');
            this._player.ready(function() {

                var aspectRatio = 9/16; // default

                if (videoDim.width > 0 && videoDim.height > 0) {
                    aspectRatio = videoDim.height / videoDim.width;
                }

                function resizeVideoJS() {
                    width = this.$('#'+ self._player.id()).parent().width();

                    // Set width to fill parent element, Set height
                    self._player.width(width).height(width * aspectRatio);
                }

                resizeVideoJS(); // Initialize the function
                window.onresize = resizeVideoJS; // Call the function on resize
            });
        },

        fullScreen: function() {
            if (this._player) {
                this._player.requestFullScreen();
            }
        },

        edit: function() {
            App.appRouter.navigate('#videos/edit/'+ this.model.get('id'), true);
        }
    });

});
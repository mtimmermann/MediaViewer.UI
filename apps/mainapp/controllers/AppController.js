define(function(require, exports, module) {

	var App = require('App'),
		HeaderView = require('views/Header'),
		PaginatorView = require('views/Paginator'),
        SearchInputView = require('views/videos_search/SearchInput'),
        VideoListLayout = require('views/main_list/VideoListLayout'),
        VideoListView = require('views/main_list/VideoList'),
        VideoListInfiniteScrollView = require('views/infinite_scroll/VideoList'),
        VideoDetailsView = require('views/VideoDetails'),
        VideoEditView = require('views/VideoEdit'),
        Videos = require('collections/Videos'),
        Video = require('models/Video'),
		AboutView = require('views/About');

    return Backbone.Marionette.Controller.extend({

        initialize: function (/*options*/) {
            this._userInfo = App.settings.userInfo || {};

        	this._headerView = new HeaderView({ userInfo: this._userInfo });
            App.headerRegion.show(this._headerView);

            // Event subscriptions
            // Prevent UI shifting on paging operations
            App.Notifications.on('Paginator.onPrePage', this._onPrePage, this);
            App.Notifications.on('Paginator.onDonePage', this._onDonePage, this);
            App.Notifications.on('Logout', this._onLogout, this);
        },

        // AppRouter appRoutes
        index: function () {
            this._headerView.setActiveLink('index');

            this._initVideoCollection();

            $.when(App.collections.videos.deferred.promise()).done(function () {
                var videoListLayout = new VideoListLayout();
                App.mainRegion.show(videoListLayout);

                // Show List region
                videoListLayout.list.show(
                    new VideoListView({'collection': App.collections.videos}));

                // Show pagination regions
                videoListLayout.paginatorTop.show(
                    new PaginatorView(App.collections.videos));
                videoListLayout.paginatorBottom.show(
                    new PaginatorView(App.collections.videos));

                // Show video search input region
                videoListLayout.search.show(new SearchInputView());
            });
        },

        infiniteScroll: function() {
            this._headerView.setActiveLink('infinite-scroll');

            this._initVideoCollection();

            $.when(App.collections.videos.deferred.promise()).done(function () {
                App.mainRegion.show(new VideoListInfiniteScrollView({ 'collection': App.collections.videos }));
            });
        },

        videoAdd: function() {
            this._headerView.setActiveLink('add-video');
            var video = new Video();
            App.mainRegion.show(new VideoEditView({model: video}));
        },

        videoDetails: function(modelId) {
            var self = this;
            this._headerView.setActiveLink('none');

            // Try finding model in current paged collection, otherwise fetch the model.
            var model = null;
            var deferred = new $.Deferred();
            if (App.collections.videos) {
                model = _.findWhere(App.collections.videos.models, {'id': modelId});
                if (model) {
                    deferred.resolve();
                }
            }
            if (deferred.state() != 'resolved') {
                model = new Video({'id': modelId});
                model.fetch().done(function() {
                    deferred.resolve();
                }).fail(function(jqXHR/*, textStatus, errorThrown*/) {
                    if (jqXHR.status === 403) {
                        self._onLogout();
                    } else if (jqXHR.status == 404) {
                        // TODO: 404 - Bootstrap alert message or view
                    } else {
                        // TODO: General server - Bootstrap alert message or view
                    } 
                });
            }
            $.when(deferred.promise()).done(function () {
                App.mainRegion.show(new VideoDetailsView({ model: model, userInfo: self._userInfo }));
            });
        },

        videoEdit: function(modelId) {
            var self = this;
            this._headerView.setActiveLink('none');
            var model = new Video({'id': modelId});
            var deferred = model.fetch();
            $.when(deferred.promise()).done(function () {
                if (model.get('ownerId') === self._userInfo.id) {
                    App.mainRegion.show(new VideoEditView({ model: model }));
                }// else { TODO: Consider a not authorized view }
            }).fail(function(jqXHR/*, textStatus, errorThrown*/) {
                if (jqXHR.status === 403) {
                    self._onLogout();
                } else if (jqXHR.status === 404) {
                    // TODO: 404 - Bootstrap alert message or view
                } else {
                    // TODO: General server - Bootstrap alert message or view
                } 
            });
        },

        admin: function() {
            this._headerView.setActiveLink('admin');
        },

        about: function() {
        	this._headerView.setActiveLink('about');
        	App.mainRegion.show(new AboutView());
        },

        _initVideoCollection: function() {
            App.collections.videos = new Videos();
            App.collections.videos.getCollection();
        },

        // Prevent UI shifting on paging operations
        _onPrePage: function(/*message*/) {
            //var height = App.mainRegion.currentView.contactList.$el.height();
            var height = App.mainRegion.currentView.list.$el.parent().height();
            App.mainRegion.currentView.list.$el.css('height', height);
        },
        _onDonePage: function(/*message*/) {
            $.when(App.collections.videos.deferred.promise()).done(function () {
                setTimeout(function() {
                    App.mainRegion.currentView.list.$el.css('height', '');
                }, 500);
            });
        },

        _onLogout: function(/*message*/) {
            window.location.replace('/login');
        }
    });

});
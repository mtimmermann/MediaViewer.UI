define(function(require, exports, module) {

	var App = require('App'),
		HeaderView = require('views/Header'),
		PaginatorView = require('views/Paginator'),
        SearchInputView = require('views/users/search/SearchInput'),
        IndexView = require('views/Index'),

        UserListLayout = require('views/users/list/ListLayout'),
        UserListView = require('views/users/list/List'),
        UserDetailsView = require('views/users/Details'),
        UserEditView = require('views/users/Edit'),
        Users = require('collections/Users'),
        User = require('models/User'),

        VideoListLayout = require('views/videos/ListLayout'),
        VideoListView = require('views/videos/List'),
        Videos = require('collections/Videos'),

        FileListLayout = require('views/files/ListLayout'),
        FileListView = require('views/files/List'),
        Files = require('collections/Files');

    return Backbone.Marionette.Controller.extend({

        initialize: function (/*options*/) {
            this._userInfo = App.settings.userInfo || {};
            if (!this._userInfo.isLoggedIn) {
                window.location.replace('/login');
            }
            this._isAdmin = false;
            if (_.isArray(this._userInfo.roles)) {
                if (_.indexOf(this._userInfo.roles, 'super-admin') >= 0) {
                    this._isAdmin = true;
                } else {
                    window.location.replace('/login');       
                }
            }

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

            App.mainRegion.show(new IndexView());
        },

        users: function() {
            this._initUserCollection();

            $.when(App.collections.users.deferred.promise()).done(function () {
                var listLayout = new UserListLayout();
                App.mainRegion.show(listLayout);

                // Show List region
                listLayout.list.show(
                    new UserListView({'collection': App.collections.users}));

                // Show pagination regions
                listLayout.paginatorTop.show(
                    new PaginatorView(App.collections.users));
                listLayout.paginatorBottom.show(
                    new PaginatorView(App.collections.users));

                // Show search input region
                listLayout.search.show(new SearchInputView());
            });
        },

        userAdd: function() {
            this._headerView.setActiveLink('add-video');
            var video = new Video();
            App.mainRegion.show(new VideoEditView({model: video}));
        },

        // userDetails: function(modelId) {
        //     var self = this;
        //     this._headerView.setActiveLink('none');

        //     // Try finding model in current paged collection, otherwise fetch the model.
        //     var model = null;
        //     var deferred = new $.Deferred();
        //     if (App.collections.videos) {
        //         model = _.findWhere(App.collections.videos.models, {'id': modelId});
        //         if (model) {
        //             deferred.resolve();
        //         }
        //     }
        //     if (deferred.state() != 'resolved') {
        //         model = new Video({'id': modelId});
        //         model.fetch().done(function() {
        //             deferred.resolve();
        //         }).fail(function(jqXHR/*, textStatus, errorThrown*/) {
        //             if (jqXHR.status === 403) {
        //                 self._onLogout();
        //             } else if (jqXHR.status == 404) {
        //                 // TODO: 404 - Bootstrap alert message or view
        //             } else {
        //                 // TODO: General server - Bootstrap alert message or view
        //             } 
        //         });
        //     }
        //     $.when(deferred.promise()).done(function () {
        //         App.mainRegion.show(new VideoDetailsView({ model: model, userInfo: self._userInfo }));
        //     });
        // },

        userEdit: function(modelId) {
            var self = this;
            this._headerView.setActiveLink('none');
            var model = new User({'id': modelId});
            var deferred = model.fetch();
            $.when(deferred.promise()).done(function () {
                App.mainRegion.show(new UserEditView({ model: model }));
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

        videos: function() {
            this._initVideoCollection();

            $.when(App.collections.videos.deferred.promise()).done(function () {
                var listLayout = new VideoListLayout();
                App.mainRegion.show(listLayout);

                // Show List region
                listLayout.list.show(
                    new VideoListView({'collection': App.collections.videos}));
            });
        },

        files: function() {
            this._initFileCollection();

            $.when(App.collections.files.deferred.promise()).done(function () {
                var listLayout = new FileListLayout();
                App.mainRegion.show(listLayout);

                // Show List region
                listLayout.list.show(
                    new FileListView({'collection': App.collections.files}));
            });
        },

        _initUserCollection: function() {
            App.collections.users = new Users();
            App.collections.users.getCollection();
        },

        _initVideoCollection: function() {
            App.collections.videos = new Videos();
            App.collections.videos.getCollection();
        },

        _initFileCollection: function() {
            App.collections.files = new Files();
            App.collections.files.getCollection();
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
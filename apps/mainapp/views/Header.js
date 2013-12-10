define(function(require, exports, module) {

	var HeaderTemplate = require('tpl!templates/header.jst');

    /**
     * Header class - Item view
     */
    return Backbone.Marionette.ItemView.extend({

    	events: {
    		'click [data-header-link="about"]': 'linkSelect',
    		'click [data-header-link="index"]': 'linkSelect',
            'click [data-header-link="logout"]': 'logout',
            'click .dropdown-nested': 'openNestedToggle'
    	},

        template: HeaderTemplate,

        initialize: function(options) {
            options = options || {};
            if (!options.userInfo) {
                throw (new Error('Header View: userInfo option is required'));
            }
            this._userInfo = options.userInfo;
        },

        onRender: function() {
            if (this._userInfo.isLoggedIn) {
                this.$('[data-header-link="login"]').addClass('hidden');
                this.$('[data-header-link="user"]').removeClass('hidden');
                this.$('[data-header-link="add-video"]').removeClass('hidden');
            }

            if (_.isArray(this._userInfo.roles)) {
                if (_.indexOf(this._userInfo.roles, 'super-admin') >= 0) {
                    this.$('[data-header-link="admin"]').removeClass('hidden');
                }
            }
        },

        linkSelect: function(e) {
        	var ele = $(e.currentTarget);
        	if (ele.data('header-link')) {
        		this.$('[data-header-link]').removeClass('active');
        		ele.addClass('active');
        	}
        },

        setActiveLink: function(link) {
        	this.$('[data-header-link]').removeClass('active');
            if (link && link !== 'none') {
        	   this.$('[data-header-link="'+ link +'"]').addClass('active');
            }
        },

        openNestedToggle: function(e) {
            e.stopPropagation();
            var dropdown = $(e.currentTarget).children('.dropdown-menu');
            dropdown.toggle();
        },

        logout: function() {
            $.ajax({
                type: 'get',
                dataType: 'json',
                url: App.settings.baseServiceUrl +'logout',
                async: false
            }).done(function(/*data, textStatus, jqXHR*/) {
                window.location.replace('/login');
            });
        }
    });

});
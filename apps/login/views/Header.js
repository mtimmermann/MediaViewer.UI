define(function(require, exports, module) {

	var HeaderTemplate = require('tpl!templates/header.jst');

    // Header View
    return Backbone.Marionette.ItemView.extend({

    	events: {
    		'click [data-header-link="about"]': 'linkSelect',
    		'click [data-header-link="index"]': 'linkSelect',
            'click .dropdown-nested': 'openNestedToggle'
    	},

        template: HeaderTemplate,

        //initialize: function() { },

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
        }
    });

});
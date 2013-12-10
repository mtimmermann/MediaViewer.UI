define(function(require, exports, module) {

	var PaginatorTemplate = require('tpl!templates/paginator.jst');

    // Paginator View
    return Backbone.Marionette.ItemView.extend({

        className: 'pagination-wrapper',
        template: PaginatorTemplate,

        events: {
        	'click [data-paginator-link="prev"]': 'prev',
        	'click [data-paginator-link="next"]': 'next'
        },

        initialize: function(model /*,options*/) {
        	this.collection = model;
        	//this.collection.listenTo(this.collection, 'change', this.render);
        	this.collection.listenTo(this.collection, 'reset', this.render);
        },

        render: function() {
            var paginationViewModel = {
                currentPage: this.collection.currentPage,
                totalPages: this.collection.totalPages
            };

        	this.$el.html(PaginatorTemplate(paginationViewModel));

            if (this.collection.currentPage === 1) {
                this.$('[data-paginator-link="prev"]').parent('li').addClass('disabled');
            }
            if (this.collection.currentPage === this.collection.totalPages) {
                this.$('[data-paginator-link="next"]').parent('li').addClass('disabled');
            }

        	return this;
        },

        prev: function() {
            if (this.$('[data-paginator-link="prev"]').parent('li').hasClass('disabled')) {
                return false;
            }
            App.Notifications.trigger('Paginator.onPrePage', null);
        	this.collection.previousPage({});
        	this.collection.getCollection();
            App.Notifications.trigger('Paginator.onDonePage', null);
            return false; // Prevent href="#" anchor event
        },

        next: function() {
            if (this.$('[data-paginator-link="next"]').parent('li').hasClass('disabled')) {
                return false;
            }
            App.Notifications.trigger('Paginator.onPrePage', null);
            this.collection.nextPage({});
            //this.collection.goTo(this.collection.currentPage + 1);
            this.collection.getCollection();
            App.Notifications.trigger('Paginator.onDonePage', null);
            return false; // Prevent href="#" anchor event
        }

    });

});
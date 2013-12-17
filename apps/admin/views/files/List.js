define(function(require, exports, module) {

	var ListTemplate = require('tpl!templates/files/list.jst'),
		ListItemView = require('views/files/ListItem');

    /**
     * List class - Composite view
     */
    return Backbone.Marionette.CompositeView.extend({
        tagName: 'div',
        //className: 'datagrid',
        template: ListTemplate,
        itemView: ListItemView,

        events: {
            'click input[name="all"]': 'toggleCheckBoxes',
            'click input[type="checkbox"]': 'toggleDeleteEnabled',
            'click [data-list-button="delete"]': 'deleteSelected'
        },

        initialize: function(options) {
            options = options || {};
            if (!options.collection) {
                throw (new Error('List View: collection option is required'));
            }
        },

        appendHtml: function(collectionView, itemView) {
            collectionView.$('tbody').append(itemView.el);
        },

        toggleCheckBoxes: function(e) {
            var isChecked = $(e.currentTarget).is(':checked');
            this.$('input[name="orphans"]').prop('checked', isChecked);
        },
        toggleDeleteEnabled: function() {
            var disabled = this.$('input[name="orphans"]').filter(':checked').length === 0;
            this.$('[data-list-button="delete"]').prop('disabled', disabled)
        },

        deleteSelected: function() {
            var self = this;

            // Hide all form alerts
            this.$('div.alert').slideUp();

            var orphanPaths = [];
            $.each(this.$('input[name="orphans"]').filter(':checked'), function(index, input) {
                orphanPaths.push($(input).val());
            });
            $.ajax({
                url: App.settings.baseServiceUrl + 'file/orphans',
                type: 'DELETE',
                data: JSON.stringify(orphanPaths),
                contentType: 'application/json',
                dataType: 'json'
            }).done(function (/*response, textStatus, jqXHR*/) {
                self._showAlert(self.$('[data-list-alert="delete-success"]'));
                $('html, body').animate({ scrollTop: 0 }, 'slow');
                self._hideDeletedRows();
            }).fail(function (/*jqXHR, textStatus, errorThrown*/) {
                self._showAlert(self.$('[data-list-alert="delete-error"]'));
                $('html, body').animate({ scrollTop: 0 }, 'slow');
            });
        },

        _hideDeletedRows: function() {
            $.each(this.$('input[name="orphans"]').filter(':checked'), function(index, input) {
                $(input).parents('tr').fadeOut('slow');
            });
        },

        _showAlert: function(alertDiv) {
            alertDiv.hide();
            alertDiv.removeClass('hide');
            alertDiv.slideDown();
        }

    });

});
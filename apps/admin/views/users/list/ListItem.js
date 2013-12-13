define(function(require, exports, module) {

	var ListItemTemplate = require('tpl!templates/users/list/list_item.jst');

    /**
     * ListItem class - Item view
     *
     * Extends the BaseClasses.View.ItemFadeIn class, which
     * extends the the Marionette.ItemView class.
     */
    return BaseClasses.View.ItemFadeIn.extend({
        tagName: 'tr',
        template: ListItemTemplate,

        events: {
            'click [data-model-list="edit"]': 'edit'
        },

        edit: function() {
            window.location.replace('#users/edit/'+ this.model.get('id'));
        }
    });

});
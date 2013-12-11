define(function(require, exports, module) {

	var ListItemTemplate = require('tpl!templates/users/list/list_item.jst');

    /**
     * ListItem class - Item view
     */
    //return Backbone.Marionette.ItemView.extend({
    return BaseClasses.ItemViewFadeIn.extend({
        tagName: 'tr',
        //className: 'row clearfix',
        template: ListItemTemplate,

        events: {
            'click [data-model-list="edit"]': 'edit'
        },

        edit: function() {
            window.location.replace('#users/edit/'+ this.model.get('id'));
        }
    });

});
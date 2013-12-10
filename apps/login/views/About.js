define(function(require, exports, module) {

	var AboutTemplate = require('tpl!templates/about.jst');

    // About class - Item view
    return BaseClasses.ItemViewFadeIn.extend({
        template: AboutTemplate
    });

});
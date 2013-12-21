var BaseClasses = BaseClasses || {};
BaseClasses.View = BaseClasses.View || {};

/**
 * BaseClasses.View.FormValidation class
 *
 * Extends the BaseClasses.view.ItemFadeIn, which extends
 * the Marionette.ItemView class.
 *
 * Note: Form views implementing this base class must use a model
 * derived from the BaseClasses.Model.FormValidation class.
 */
BaseClasses.View.FormValidation = BaseClasses.View.ItemFadeIn.extend({

    _inValidList: [],

    inputKeyup: function(e) {
        var target = e.target;
        var property = target.name;
        if ($(target).parent('.form-group').hasClass('error') || _.indexOf(this._inValidList, property) >=0) {
            this._inputValidate(e);
        }
    },

    inputChange: function(e) {
        this._inputValidate(e);
    },

    _inputValidate: function (e) {
        // Apply the change to the model
        var target = e.target;
        var change = {};
        var property = target.name;
        var value = target.value;

        // Handle checkbox input groups
        if ($(target).attr('type') && $(target).attr('type').toLowerCase() === 'checkbox') {
            value = [];
            _.each(this.$('input[name="'+ property +'"]'), function(input) {
                if ($(input).is(':checked')) {
                    value.push($(input).val());
                }
            });
        }

        change[property] = value;

        // Setup the base validation model for the validation call backs.
        this.model.setSingleItemValidation(property);

        // Do not validate if tabbing into text field for the first time
        var validate = (e.keyCode !== 9) ? true : false;

        // Set validate: true to update validation with the model change
        this.model.set(property, value);
        this.model.set(change, {'validate': validate});

        // Trigger the item validation.
        // Note: Form input error handling is performed within the model
        //       class with the Backbone.Validation callback listener
        var check = this.model.validateItem(property);

        if (!check && _.indexOf(this._inValidList, property) < 0) {
            this._inValidList.push(property);
        }
    }

});
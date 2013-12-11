define(function(require, exports, module) {

	var UserEditTemplate = require('tpl!templates/users/edit.jst');

	/**
     * UserEdit class - Item view
     */
    return BaseClasses.ItemViewFadeIn.extend({

        tagName: 'div',
        className: 'user-edit',
    	template: UserEditTemplate,

    	events: {
            'change': 'change',
            'change [data-model-edit-file="input"]': 'readFile',
    		'click [data-model-edit-button="save"]': 'validate',
    		'click [data-model-edit-button="delete"]': 'delete'
            // 'drop #edit-model-picture':     'dropHandler',
            // 'dragover #edit-model-picture': 'dragHandler', // Must call event.preventDefault() for drop event listener to work
            // 'drop div.well':                  'dropHandler',
            // 'dragover div.well':              'dragHandler' // Must call event.preventDefault() for drop event listener to work
    	},

    	initialize: function(options) {
            options = options || {};
            if (!options.model) {
                throw (new Error('VideoEdit View: model option is required'));
            }

            Backbone.Validation.bind(this);
    	},

        change: function (e) {
            // Apply the change to the model
            var target = e.target;
            var change = {};
            var property = target.name;
            change[property] = target.value;

            // Setup the base validation model for the validation call backs.
            this.model.setSingleItemValidation(property);

            // Set validate: true to update validation with the model change
            this.model.set(property, target.value);
            this.model.set(change, {'validate': true});

            // Trigger the item validation.
            // Note: Form input error handling is performed within the model
            //       class with the Backbone.Validation callback listener
            var check = this.model.validateItem(property);
        },

        validate: function () {

            // Hide all form alerts
            this.$('div.alert').slideUp();

            var check = this.model.isModelValid();

            if (check === false) {
                return false; // Prevent form submit
            }

            this.save();
            return false; // Prevent form submit
        },

        save: function() {
            var self = this;
            this.model.save(null, {
                success: function(/*model, response, jqXHR*/) {
                    self._showAlert(self.$('[data-model-edit-alert="save-success"]'));
                    $('html, body').animate({ scrollTop: 0 }, 'slow');
                },
                error: function (/*model, jqXHR, errorThrown*/) {
                    self._showAlert(self.$('[data-model-edit-alert="error-save"]'));
                    $('html, body').animate({ scrollTop: 0 }, 'slow');
                }
            });
        },

        delete: function () {
            var self = this;

            // Hide all form alerts
            this.$('div.alert').slideUp();

            this.model.destroy({
                success: function (/*model, response, jqXHR*/) {
                    // TODO: Display bootstrap floating alert
                    self._showAlert(self.$('[data-model-edit-alert="delete-success"]'));
                    $('html, body').animate({ scrollTop: 0 }, 'slow');
                    self.$('[data-model-edit="form-elements"]').fadeOut();
                },
                error: function (/*model, jqXHR, errorThrown*/) {
                    self._showAlert(self.$('[data-model-edit-alert="error-delete"]'));
                    $('html, body').animate({ scrollTop: 0 }, 'slow');
                }
            });

        	return false; // Prevent form submit
        },

        _showAlert: function(alertDiv) {
            alertDiv.hide();
            alertDiv.removeClass('hide');
            alertDiv.slideDown();
        }

    });

});
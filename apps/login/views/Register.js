define(function(require, exports, module) {

    var RegisterTemplate = require('tpl!templates/register.jst'),
        RegisterModel = require('models/Register');

    // Register class - Item view
    return BaseClasses.ItemViewFadeIn.extend({
        tagName: 'div',
        className: 'row clearfix registration-form',
        template: RegisterTemplate,

        events: {
            'change': 'change',
            'click [data-registration-form-button="signup"]': 'validate'
        },

        initialize: function(/*options*/) {
            this.model = new RegisterModel();
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
            var self = this;

            // Hide all form alerts
            this.$('div.alert').slideUp();

            //var check = this.model.isValid();
            var check = this.model.isModelValid();

            if (check === false) {
                return false; // Prevent form submit
            }

            if (this.model.get('password') === this.model.get('confirmPassword')) {
                this.register();
            } else {
                var formGroup = this.$('#confirmPassword').parent('.form-group');
                formGroup.addClass('error');
                formGroup.find('.help-inline').html('Confirm password and password fields do not match');
            }

            return false; // Prevent form submit
        },

        register: function() {
            var self = this;

            var data = _(this.model.attributes).clone();
            delete data.confirmPassword;
            $.ajax({
                type: 'post',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify(data),
                url: App.settings.baseServiceUrl +'register'
            }).done(function(response/*, textStatus, jqXHR*/) {
                if (response.IsSuccess) {
                    window.location.replace('/');
                } else {
                    self._showAlert(self.$('[data-registration-form-alert="tech-problems"]'));
                }
            }).fail(function (jqXHR/*, textStatus, errorThrown*/) {
                if (jqXHR.status === 409 && jqXHR.responseJSON &&
                    jqXHR.responseJSON.message && jqXHR.responseJSON.message === 'User exists') {
                        self._showAlert(self.$('[data-registration-form-alert="user-exists"]'));
                } else {
                    self._showAlert(self.$('[data-registration-form-alert="tech-problems"]'));
                }
            });
        },

        _showAlert: function(alertDiv) {
            alertDiv.hide();
            alertDiv.removeClass('hide');
            alertDiv.slideDown();
        }

    });

});
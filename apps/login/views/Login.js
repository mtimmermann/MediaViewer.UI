define(function(require, exports, module) {

    var LoginTemplate = require('tpl!templates/login.jst'),
        LoginModel = require('models/Login');

    /**
     * Login class - Item view
     *
     * Extends the BaseClasses.View.ItemFadeIn class, which
     * extends the the Marionette.ItemView class.
     */
    return BaseClasses.View.ItemFadeIn.extend({
        tagName: 'div',
        className: 'row clearfix login-form',
        template: LoginTemplate,

        events: {
            'change': 'change',
            'keyup input[type="text"]': 'change',
            'keyup input[type="password"]': 'change',
            'click [data-login-form-button="login"]': 'validate'
        },

        initialize: function(/*options*/) {
            this.model = new LoginModel();
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

            // Do not validate if tabbing into text field for the first time
            var validate = (e.keyCode !== 9) ? true : false;

            // Set validate: true to update validation with the model change
            this.model.set(property, target.value);
            this.model.set(change, {'validate': validate});

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

            this.login();

            return false; // Prevent form submit
        },

        login: function() {
            var self = this;


            var l = Ladda.create(this.$('[data-login-form-button="login"]')[0]);
            l.start();

            $.ajax({
                type: 'post',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify(this.model.attributes),
                url: App.settings.baseServiceUrl +'login'
            }).success(function(response/*, textStatus, jqXHR*/) {
                if (response.IsSuccess) {
                    window.location.replace('/');
                } else {
                    self._showAlert(self.$('[data-login-form-alert="tech-problems"]'));
                }
            }).error(function (jqXHR, textStatus, errorThrown) {
                if (jqXHR.status === 401) {
                    self._showAlert(self.$('[data-login-form-alert="auth-failed"]'));
                } else {
                    self._showAlert(self.$('[data-login-form-alert="tech-problems"]'));
                }
            }).always(function() {
                l.stop();
            });
        },

        _showAlert: function(alertDiv) {
            alertDiv.hide();
            alertDiv.removeClass('hide');
            alertDiv.slideDown();
        }

    });

});
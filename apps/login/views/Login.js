define(function(require, exports, module) {

    var LoginTemplate = require('tpl!templates/login.jst'),
        LoginModel = require('models/Login');

    /**
     * Login class - Item view
     *
     * Extends the BaseClasses.View.FormValidation class.
     */
    return BaseClasses.View.FormValidation.extend({
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

        // change method is inherited from BaseClasses.View.FormValidation.
        // Enable the code below to apply extra logic
        // change: function() {
        //     this.constructor.__super__.onRender.apply(this);
        // },

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
                    l.stop();
                    self._showAlert(self.$('[data-login-form-alert="tech-problems"]'));
                }
            }).error(function (jqXHR, textStatus, errorThrown) {
                l.stop();
                if (jqXHR.status === 401) {
                    self._showAlert(self.$('[data-login-form-alert="auth-failed"]'));
                } else {
                    self._showAlert(self.$('[data-login-form-alert="tech-problems"]'));
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
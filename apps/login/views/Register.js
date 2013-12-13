define(function(require, exports, module) {

    var RegisterTemplate = require('tpl!templates/register.jst'),
        RegisterModel = require('models/Register');

    /**
     * Register class - Item view
     *
     * Extends the BaseClasses.View.FormValidation class.
     */
    return BaseClasses.View.FormValidation.extend({
        tagName: 'div',
        className: 'row clearfix registration-form',
        template: RegisterTemplate,

        events: {
            'change': 'change',
            'keyup input[type="text"]': 'change',
            'keyup input[type="password"]': 'change',
            'click [data-registration-form-button="signup"]': 'validate'
        },

        initialize: function(/*options*/) {
            this.model = new RegisterModel();
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

            var l = Ladda.create(this.$('[data-registration-form-button="signup"]')[0]);
            l.start();

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
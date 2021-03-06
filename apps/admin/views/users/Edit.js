define(function(require, exports, module) {

	var UserEditTemplate = require('tpl!templates/users/edit.jst');

	/**
     * UserEdit class - Item view
     *
     * Extends the BaseClasses.View.FormValidation class.
     */
    return BaseClasses.View.FormValidation.extend({

        tagName: 'div',
        className: 'user-edit',
    	//template: UserEditTemplate,

    	events: {
            'change': 'change',
            'keyup input[type="text"]': 'change',
            'keyup input[type="password"]': 'change',
            'click input[type="checkbox"]': 'change',

            'change [data-model-edit-file="input"]': 'readFile',
    		'click [data-model-edit-button="save"]': 'validate',
    		'click [data-model-edit-button="destroy"]': 'confirmDestroy',
            'click [data-model-edit="change-password"]': 'toggleChangePassword',
            'click [data-model-edit="change-password-cancel"]': 'toggleChangePassword'
    	},

    	initialize: function(options) {
            options = options || {};
            if (!options.model) {
                throw (new Error('VideoEdit View: model option is required'));
            }

            // Remove password validation by default. Store the validation
            //  in case the change password option is chosen.
            this._showChangePassword = false;
            this._validation = _(this.model.validation).clone();
            this._setValidation();

            this._isConfirmDeleteShow = false;
    	},

        render: function() {
            var tmp = App.settings.adminRoles;
            this.$el.html(UserEditTemplate({ model: this.model.attributes, rolesMap: App.settings.adminRoles }));
            return this;
        },

        // change method is inherited from BaseClasses.View.FormValidation.
        // Enable the code below to apply extra logic
        // change: function() {
        //     this.constructor.__super__.onRender.apply(this);
        // },

        validate: function () {

            // Hide all form alerts
            this.$('div.alert').slideUp();

            var check = this.model.isModelValid();

            if (check === false) {
                return false; // Prevent form submit
            }

            if (this._showChangePassword) {
                if (this.model.get('password') === this.model.get('confirmPassword')) {
                    this.save();
                } else {
                    var formGroup = this.$('#confirmPassword').parent('.form-group');
                    formGroup.addClass('error');
                    formGroup.find('.help-inline').html('Confirm password and password fields do not match');
                }
            } else {
                this.save();                
            }

            return false; // Prevent form submit
        },

        save: function() {
            var self = this;

            if (!this._showChangePassword) {
                this.model.set('password', '');
            }

            var laddaBtn = Ladda.create(this.$('[data-model-edit-button="save"]')[0]);
            laddaBtn.start();

            this.model.save(null, {
                success: function(/*model, response, jqXHR*/) {
                    laddaBtn.stop();
                    self._showAlert(self.$('[data-model-edit-alert="save-success"]'));
                    $('html, body').animate({ scrollTop: 0 }, 'slow');
                },
                error: function (/*model, jqXHR, errorThrown*/) {
                    laddaBtn.stop();
                    self._showAlert(self.$('[data-model-edit-alert="error-save"]'));
                    $('html, body').animate({ scrollTop: 0 }, 'slow');
                }
            });
        },

        // Using http://ethaizone.github.io/Bootstrap-Confirmation/
        // Note: $(ele).confirmation('toggle') is not working properly,
        //       using 'show' & 'hide' for now (plugin is Beta)
        confirmDestroy: function() {
            var self = this;
            var button = this.$('[data-model-edit-button="destroy"]');
            button.confirmation('destroy');
            button.confirmation({
                onCancel: function() { button.confirmation('hide'); },
                onConfirm: function() { button.confirmation('hide'); self.destroy(); return false; }
            });
            if (!this._isConfirmDeleteShow) {
                button.confirmation('show');
            } else {
                button.confirmation('hide');
            }
            this._isConfirmDeleteShow = !this._isConfirmDeleteShow;
            return false; // Prevent form submit
        },

        destroy: function () {
            var self = this;

            // Hide all form alerts
            this.$('div.alert').slideUp();

            var laddaBtn = Ladda.create(this.$('[data-model-edit-button="destroy"]')[0]);
            laddaBtn.start();

            this.model.destroy({
                success: function (/*model, response, jqXHR*/) {
                    laddaBtn.stop();
                    // TODO: Display bootstrap floating alert
                    self._showAlert(self.$('[data-model-edit-alert="delete-success"]'));
                    $('html, body').animate({ scrollTop: 0 }, 'slow');
                    self.$('[data-model-edit="form-elements"]').fadeOut();
                },
                error: function (/*model, jqXHR, errorThrown*/) {
                    laddaBtn.stop();
                    self._showAlert(self.$('[data-model-edit-alert="error-delete"]'));
                    $('html, body').animate({ scrollTop: 0 }, 'slow');
                }
            });

        	return false; // Prevent form submit
        },

        toggleChangePassword: function() {
            var self = this;
            this._showChangePassword = !this._showChangePassword;
            if (this._showChangePassword) {
                this.$('[data-model-edit="change-password-form-group"]').slideDown();
                this.$('[data-model-edit="change-password"]').fadeOut('fast', function() {
                    self.$('[data-model-edit="change-password-cancel"]').fadeIn('fast');
                });
            } else {
                this.$('[data-model-edit="change-password-form-group"]').slideUp();
                this.$('[data-model-edit="change-password-cancel"]').fadeOut('fast', function() {
                    self.$('[data-model-edit="change-password"]').fadeIn('fast');
                });
            }
            this._setValidation();
        },

        _setValidation: function() {
            if (this._showChangePassword) {
                this.model.validation.password = _(this._validation.password).clone();
                this.model.validation.confirmPassword = _(this._validation.confirmPassword).clone();
            } else {
                delete this.model.validation.password;
                delete this.model.validation.confirmPassword;
            }
            Backbone.Validation.bind(this);
        },

        _showAlert: function(alertDiv) {
            alertDiv.hide();
            alertDiv.removeClass('hide');
            alertDiv.slideDown();
        }

    });

});
define(function(require, exports, module) {

	var VideoEditTemplate = require('tpl!templates/users/edit.jst');

	/**
     * VideoEdit class - Item view
     */
    return BaseClasses.ItemViewFadeIn.extend({

        tagName: 'div',
        className: 'video-edit',
    	template: VideoEditTemplate,

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

        _file: null,

    	initialize: function(options) {
            options = options || {};
            if (!options.model) {
                throw (new Error('VideoEdit View: model option is required'));
            }

            Backbone.Validation.bind(this);

            if (this.model.get('id') && this.model.get('uri') !== '' && 
                this.model.get('thumbnail') !== '') {
                    //this._file = 'done';
                    this.model.set('file', 'done');
            }
    	},

        onRender: function() {
            if (this.model.get('file') === 'done') {
                this.$('[data-model-edit-file="input"]').attr('value', this.model.get('uri'));
            }
            this.constructor.__super__.onRender.apply(this);
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
            var check = this.model.isModelValid();// && isVideoFileValid;

            if (check === false) {
                return false; // Prevent form submit
            }

            if (this._file && this.model.get('file') !== 'done') {
                this.uploadFile(this._file,
                    function () {
                        self.save();
                    }
                );
            } else {
                this.save();
            }
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

        // dragHandler: function (event) {
        //     event.preventDefault();
        // },

        // dropHandler: function (event) {
        //     event.stopPropagation();
        //     event.preventDefault();
        //     var e = event.originalEvent;
        //     e.dataTransfer.dropEffect = 'copy';
        //     this.pictureFile = e.dataTransfer.files[0];

        //     // Read the image file from the local file system and display it in the img tag
        //     var reader = new FileReader();
        //     reader.onloadend = function () {
        //         $('#edit-contact-picture').attr('src', reader.result);
        //     };
        //     reader.readAsDataURL(this.pictureFile);
        // },

        readFile: function(e) {
            this._file = e.target.files[0];
            var reader = new FileReader();
            //reader.onloadend = function () { reader.result; };
            reader.readAsDataURL(this._file);
            this.model.set('uri', '');
            this.model.set('thumbnail', '');
        },

        uploadFile: function (file, callbackSuccess) {
            var self = this;
            var data = new FormData();
            data.append('file', file);
            $.ajax({
                url: App.settings.baseServiceUrl + 'videos/upload',
                type: 'POST',
                data: data,
                processData: false,
                cache: false,
                contentType: false
            }).done(function (response/*, textStatus, jqXHR*/) {
                self.model.set('uri', response.uri);
                self.model.set('thumbnail', response.thumbnail);
                self.model.set('file', 'done');
                callbackSuccess();
            }).fail(function (/*jqXHR, textStatus, errorThrown*/) {
                self._showAlert(self.$('[data-model-edit-alert="error-upload"]'));
                $('html, body').animate({ scrollTop: 0 }, 'slow');
            });
        },

        _showAlert: function(alertDiv) {
            alertDiv.hide();
            alertDiv.removeClass('hide');
            alertDiv.slideDown();
        }

    });

});
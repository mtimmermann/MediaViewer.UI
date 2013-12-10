define(function(require, exports, module) {

    // Local App Settings for contacts app

    var settings = {
        public: {
            // True if app is used w/ multiple users and uploaded
            // pics need to be stored in separated sub-directories.
            getUserInfo: true,

            userInfo: null,

            defaultAvatarPath: 'img/avatar_default.jpg'
        },
        private: {
            basePicsUrl: 'pics/',
            userPicsDirectory: ''
        }
    };

    var Settings = function(settings) {
        var self = this;

        var settingsPrivate = settings.private;

        var initialize = function() {
            _.extend(self, settings.public);
        };


        /**
         * Public
         */

        self.picsUrl = function() {
            return settingsPrivate.basePicsUrl + settingsPrivate.userPicsDirectory
        };

        // Add the user pics sub-directory at runtime
        self.setUserPicsDirectory = function(directory) {
            if (!(/\/$/).test(directory)) {
                directory += '/';
            }
            settingsPrivate.userPicsDirectory = directory;
        }

        initialize();
    };
    return new Settings(settings);
});
define(function(require, exports, module) {

	//var Model = require('models/Video');

    //return Backbone.Collection.extend({
    // Paginated collection
    //return Backbone.Paginator.requestPager.extend({
    return Backbone.Paginator.clientPager.extend({

    	//url: App.settings.baseServiceUrl +'contacts',

		//model: Model,

		//initialize: function(models, options) {},

        paginator_core: {
            type: 'GET',
            dataType: 'json',
            url: AppSettings.baseServiceUrl +'file/orphans'
        },

        paginator_ui: {
            // The lowest page index your API allows to be accessed
            firstPage: 1,

            // Which page should the paginator start from
            // (also, the actual page the paginator is on)
            currentPage: 1,

            // How many items per page should be shown
            perPage: 8,

            // A default number of total pages to query in case the API or
            // service you are using does not support providing the total
            // number of pages for us.
            // 10 as a default in case your service doesn't return the total
            totalPages: 10,

            // The total number of pages to be shown as a pagination
            // list is calculated by (pagesInRange * 2) + 1.
            pagesInRange: 4
        },

        server_api: {

            'page': function() { return this.currentPage; },
            'pageSize': function() { return this.perPage; }

            // the query field in the request
            //'$filter': 'substringof(\'america\',Name)',

            // number of items to return per request/page
            //'$top': function() { return this.perPage },

            // how many results the request should skip ahead to
            // customize as needed. For the Netflix API, skipping ahead based on
            // page * number of results per page was necessary.
            //'$skip': function() { return this.currentPage * this.perPage },

            // field to sort by
            //'$orderby': 'ReleaseYear',

            // what format would you like to request results in?
            //'$format': 'json',

            // custom parameters
            //'$inlinecount': 'allpages',
            //'$callback': 'callback'
        },

		getCollection: function() {
            // Ensure Backbone pagination origModels is defined, set reset to true
            this.deferred = this.fetch({reset: true})
                .error(function(jqXHR/*, textStatus, errorThrown*/) {
                    if (jqXHR.status === 403) {
                        window.location.replace('/login');
                        App.Notifications.trigger('Logout', null);
                    }
                });
		},

        parse: function(response) {
            if (response && response.data) {
                this.totalPages = Math.ceil(response.totalRecords / this.perPage);
                return response.data;
            }
            this.totalPages = 0;
            return [];
        }

    });
});
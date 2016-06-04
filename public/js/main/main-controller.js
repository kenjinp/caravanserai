'use strict';

const
	RouteHelper = require('../helpers/route-helper'),
	_ = require('underscore');

//views
const
	HomeView = require('../home/home-view');


var mainContainer = null, modalContainer = null;

module.exports = Backbone.Marionette.Controller.extend({

	mainContainer: null,
	viewInDisplay: null,

	initialize: function (options) {
		this._initListeners();
		mainContainer = options.mainContainer;
		modalContainer = options.modalContainer;
	},

	_initListeners: function () {
		Backbone.radio.vent.on('home:show', this.showHomeView.bind(this));
	},

	showHomeView: function (options) {
		this.injectView(HomeView, 'show-home', 'home', options, 'home');
	},


	/**
	 * Injects a view in the main container
	 * @param View
	 * @param viewInDisplay
	 * @param url
	 * @param options
	 * @param parentSection
	 * @param skip
	 */
	injectView: function (View, viewInDisplay, url, options, parentSection) {

		options = options || {};

        console.log('[main controller] showing ', viewInDisplay);

		function switchView(viewInDisplay) {
			RouteHelper.navigate(url);
			mainContainer.show(new View(options));
			$('.parent-menu-item').removeClass('active');
			$('.' + parentSection).addClass('active');
			console.log('opening', parentSection);
			return viewInDisplay;
		}


		if (this.viewInDisplay === viewInDisplay) {
			return;
		}

		if (mainContainer.currentView) {
			// $.xhrPool.abortAll();
            console.log('this should die', mainContainer.currentView);
			mainContainer.currentView.remove();
		}

		this.viewInDisplay = switchView(this.viewInDisplay);
	}

});

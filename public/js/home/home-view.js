'use strict';

let View = Backbone.Marionette.LayoutView.extend({
	template: require('./home.dust'),

	events: {
		'click .home': 'goHome'
	},

	goHome: function (event) {
		event.preventDefault();
		Backbone.radio.vent.trigger('home:show', {});
	}
});

module.exports = View;

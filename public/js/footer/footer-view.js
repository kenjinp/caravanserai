'use strict';


let View = Backbone.Marionette.LayoutView.extend({
	template: require('./footer.dust'),

	initialize: function () {
		let Version = Backbone.Model.extend({url: '/api/v1/version'});
		this.model = new Version();
		this.model.fetch({
			success: function () {
				this.render();
			}.bind(this)
		});
	}
});

module.exports = View;

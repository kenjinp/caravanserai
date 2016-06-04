'use strict';

const
    Main = require('./main/main-view');
//    Footer = require('./footer/footer-view');
// var SidebarMenuView = require('../sidebar-menu/sidebar-menu');
// var HeaderView = require('../header/header-view');

// create main app
var mainApp = new Backbone.Marionette.Application();

// so marionette would render using DUst
Backbone.Marionette.Renderer.render = function (template, data) {
    var html;
    template(data, function (err, out) {
        html = out;
    });

    return html;
};

Backbone.radio = Backbone.Wreqr.radio.channel('global');

mainApp.addRegions({
    mainRegion: '#main'
});

mainApp.on('before:start', function(options){
   console.log('[app] starting up');
});

mainApp.on('start', function(options){
    console.log('[app] started');
    this.mainRegion.show(new Main());
});

mainApp.start();

var self = require("sdk/self");
var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");
//var service = require("sdk/preferences/service");

//service.set("browser.newtab.url", self.data.url("newtab.html"));
//gBrowser.webNavigation.setCurrentURI(Services.io.newURI('about:blank', null, null));

var button = buttons.ActionButton({
	id: "mozilla-link",
	label: "Visit Mozilla",
	icon: {
		"16": "./icon-16.png",
		"32": "./icon-32.png",
		"64": "./icon-64.png"
	},
	onClick: handleClick
});
tabs.on('open', function onOpen(tab) {
	tab.url = self.data.url("newtab.html");
});
//tabs.on('activate', function (tab) {
//	tab.url = self.data.url("newtab.html");
//});

function handleClick(state) {
	//	tabs.open("./newtab.html");
}
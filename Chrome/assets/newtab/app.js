function INFO() {
	var self = this;
	self.UI = $('#info');
	self.name = self.UI.find('.name');
	self.date = self.UI.find('.date');
	return self;
};

INFO.prototype.updateName = function (name) {
	var self = this;
	self.name.text(name);
	return self;
};
INFO.prototype.updateDate = function () {
	var self = this;
	var now = new Date();
	self.date.text(now.getMonth() + 1 + "/" + now.getDate());
	return self;
};
$(function () {
	start();

	function start() {
		window.INFO = new INFO();
		INFO.updateName("YAC").updateDate();
	}
})
function FRIDGE () {
	var self = this;
	self.UI = $('#right-part').find('.fridge');
	self.fridge_down_open = self.UI.find('.fridge-down-open');
	self.opener = self.UI.find('.fridge-down-holder');
	self.opener.on('click', self, self.open);
	return self;
}

FRIDGE.prototype.open = function (e) {
	var self = e.data;
	self.fridge_down_door.toggleClass('open');
};
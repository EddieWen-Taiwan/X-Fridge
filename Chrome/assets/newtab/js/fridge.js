function FRIDGE() {
	var self = this;
	self.UI = $('#right-part').find('.fridge');
	return self;
}

FRIDGE.prototype.putFood = function () {
	var self = this;
	var food = JSON.parse('[{"name":"牛小排","buydate":"2015-02-01","quantity":3,"expire":"2015-02-15","type":"t13"}]');
	var i, max = food.length;
	for (i = 0; i < max; i += 1) {
		var item = food[i];
		var ele = $('<img>');
		ele.attr('src', './assets/newtab/images/food_type/'+item.type+'.png');
		self.UI.append(ele);
	}
};
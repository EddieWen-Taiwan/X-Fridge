function FRIDGE() {
	var self = this;
	self.UI = $('#right-part').find('.fridge');
	return self;
}

FRIDGE.prototype.putFood = function () {
	var self = this;
	var food = tool.read('food');
	var i, max = food.length;
	self.UI.droppable({
		drop: function (e, ui) {
			var ele = ui.draggable;
			var top = ele.css('top');
			var left = ele.css('left');
			var index = ele.attr('index');
			tool.update('food', index, {
				top: top,
				left: left
			});
		}
	});
	for (i = 0; i < max; i += 1) {
		var item = food[i];
		self.createItem(item, i);
	}
};
FRIDGE.prototype.putItem = function (item) {
	var self = this;
	self.createItem(item, food_arr.length - 1);
};
FRIDGE.prototype.createItem = function (item, index) {
	var self = this;
	var ele = $('<div><span class="health"></span><img><span class="name"></span></div>');
	if (item.top && item.left)
		ele.css({
			"top": item.top,
			"left": item.left
		});
	ele.attr('index', index);
	ele.find('img').attr('src', item.type).hover(
		function () {
			$(this).siblings('span').addClass('show')
		},
		function () {
			$(this).siblings('span').removeClass('show')
		}
	);
	var exp = item.expire;
	var now = new Date().stringFormat();
	var buy = item.buydate;
	var perc = tool.getDiffDays(now,exp) / tool.getDiffDays(buy, exp);
	ele.find('span.health').width(perc*100+"%");
	ele.find('span.name').text(item.name);
	ele.draggable();
	self.UI.append(ele);
};
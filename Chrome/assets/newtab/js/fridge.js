function FRIDGE() {
	var self = this;
	self.UI = $('#right-part').find('.fridge');
	return self;
}

FRIDGE.prototype.putFood = function () {
	var self = this;
	var food = tool.read('food');
	var i,
		max = food.length;
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
		var ele = $('<div><img><span></span></div>');
		if (item.top && item.left)
			ele.css({
				"top": item.top,
				"left": item.left
			});
		ele.attr('index', i);
		ele.find('img').attr('src', item.type).hover(
			function () {
				$(this).siblings('span').show()
			},
			function () {
				$(this).siblings('span').hide()
			}
		);
		ele.find('span').text(item.name).hide();
		ele.draggable();
		self.UI.append(ele);
	}
};
FRIDGE.prototype.putItem = function (item) {
	var self = this;
	var ele = $('<div><img><span></span></div>');
	if (item.top && item.left)
		ele.css({
			"top": item.top,
			"left": item.left
		});
	ele.attr('index', food_arr.length-1);
	ele.find('img').attr('src', item.type).hover(
		function () {
			$(this).siblings('span').show()
		},
		function () {
			$(this).siblings('span').hide()
		}
	);
	ele.find('span').text(item.name).hide();
	ele.draggable();
	self.UI.append(ele);
};
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
	self.UI.on('click', '.item', self ,self.openDetail);
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
	var ele = $('<div class="item"><span class="health"></span><img><span class="name"></span></div>');
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
	var perc = tool.getDiffDays(now, exp) / tool.getDiffDays(buy, exp);
	if (perc < 0.3)
		ele.addClass('dying');
	ele.find('span.health').width(perc * 100 + "%");
	ele.find('span.name').text(item.name);
	ele.draggable();
	self.UI.append(ele);
	ele.data('item', item);
};
FRIDGE.prototype.openDetail = function (e) {
	var self = e.data
	self.UI.find('.modal').remove();
	var $self = $(this);
	var item = $self.data('item');
	var modal = $('<div class="modal"><div class="name-ctn"><span class="name"></span>*<span class="quan"></span></div><div class="expire"></div></div>');
	modal.find('.name').text(item.name);
	modal.find('.quan').text(item.quantity);
	modal.find('.expire').html('EXPR: <br>'+item.expire);
	modal.appendTo(self.UI);
};
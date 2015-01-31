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
		drop: function(e, ui){
//			ui.draggable.css({'top':e.pageY,'left':e.pageX});
		}
	});
	for (i = 0; i < max; i += 1) {
		var item = food[i];
		var ele = $('<div><img><span></span></div>');
		ele.find('img').attr('src', item.type).hover(
			function(){$(this).siblings('span').show()},
			function(){$(this).siblings('span').hide()}
		);
		ele.find('span').text(item.name).hide();
		ele.draggable();
		self.UI.append(ele);
	}
};
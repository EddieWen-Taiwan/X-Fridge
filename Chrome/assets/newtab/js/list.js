function LIST() {
	var self = this;
	self.UI = $('#list');
	self.ADD = new LIST_ADD(self);
	self.UL = new LIST_UL(self);
	self.UL.readItem();
	return self;
}

LIST.prototype.xxx = function () {
	var self = this;
	return self;
};

LIST.prototype.ccc = function () {
	var self = this;
	return self;
};

function LIST_ADD(parent) {
	var self = this;
	self.parent = parent;
	self.UI = self.parent.UI.find('#add');
	self.food_name = self.UI.find('.food_name');
	self.food_date = self.UI.find('.food_date');
	self.food_quantity = self.UI.find('.food_quantity');
	self.food_type = self.UI.find('.food_type');
	self.add_item = self.UI.find('.add_item');
	self.add_item.on('click', self, function (e) {
		var self = e.data;
		var item = {
			name: self.food_name.val(),
			buydate: new Date().stringFormat(),
			expire: self.food_date.val(),
			quantity: self.food_quantity.val(),
			type: self.food_type.val()
		};
		self.addItem(item);
	});
	return self;
}

LIST_ADD.prototype.addItem = function (item) {
	var self = this;
	tool.write('food', item);
	self.clearItem();
	self.parent.UL.addItem(item);
};
LIST_ADD.prototype.clearItem = function () {
	var self = this;
	self.food_name.val('');
	self.food_date.val('');
	self.food_type.val('');
	self.food_quantity.val('');

};

function LIST_UL(parent) {
	var self = this;
	self.parent = parent;
	self.UI = self.parent.UI.find('#food-list');
	self.CTN = self.UI.find('.food_list');

	self.CTN.on('click','.delete', function(e){
		self.deleteItem(this);
	})
}
LIST_UL.prototype.addItem = function (item) {
	var self = this;
	var $li = $('<li><div class="box"></div></li>');
	var $name = $('<div class="food"></div>');
	var $days = $('<div class="days"></div>');
	var $quantity = $('<div class="num"></div>');
	var $del = $('<div class="delete">－</div>');

	$name.text(item['name']);
	$days.text( tool.ifexpired(item['expire']) );
	$quantity.text("x " + item['quantity']);
	$del.text(item['del']);

	$li.find('.box').append($name);
	$li.find('.box').append($quantity);
	$li.find('.box').append($days);
	$li.find('.box').append($del);
	self.CTN.append($li);	
}
LIST_UL.prototype.deleteItem = function (item) {
	var index = $('li').index( $(item).parent().parent() );
	tool.remove("food", index);
	$(item).parent().parent().remove();
	console.log(index);
}
LIST_UL.prototype.readItem = function () {
	var self = this;
	var item = tool.read("food");
	item.forEach(function(v, i){
		self.addItem(v);
	});
}
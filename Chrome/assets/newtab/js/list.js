function LIST() {
	var self = this;
	self.UI = $('#left-part');
	self.ADD = new LIST_ADD(self);
	self.UL = new LIST_UL(self);
	self.UL.readItem();
	return self;
}

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
			type: self.food_type.attr('src')
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
	FRIDGE.putItem(item);
};
LIST_ADD.prototype.clearItem = function () {
	var self = this;
	self.food_name.val('');
	self.food_date.val('');
	self.food_type.attr('src','assets/newtab/images/food_type/t1.png');
	self.food_quantity.val('');
};

function LIST_UL(parent) {
	var self = this;
	self.parent = parent;
	self.UI = self.parent.UI.find('.my-list');
	self.CTN = self.parent.UI.find('.list_block');
	self.DEL = self.parent.UI.parent().find('#confirm');

	self.CTN.on('click','.delete', function(e){
		$('#reduce').fadeIn('fast');
		var index = $('li').index( $(this).parent().parent() );
		$('#confirm .yes').attr('alt', index);
	})
	self.DEL.on('click','.yes', function(e){
		var val = $('#reduce input').val();
		val = parseInt(val);
		var index = $(this).attr('alt');
		self.deleteItem(index, val);
		$('#confirm .yes').attr('alt', -1);
		$('#reduce').fadeOut('fast');
	})
	self.DEL.on('click','.cancel', function(e){
		$('#confirm .yes').attr('alt', -1);
		$('#reduce').fadeOut('fast');
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
	self.CTN.find('.wrapper ul').append($li);
};
LIST_UL.prototype.deleteItem = function (index, quantity) {
	var quantity_obj = {quantity:quantity};
	var quantity = tool.update("quantity", index, quantity_obj);
	if(quantity == 0){
		$('.list_block').find('.wrapper').find('ul').find('li').eq(index).remove();
	}else{
		$('.list_block').find('.wrapper').find('ul').find('li').eq(index).find('.num').text(quantity);
	}
};
LIST_UL.prototype.readItem = function () {
	var self = this;
	var item = tool.read("food");
	item.forEach(function(v, i){
		self.addItem(v);
	});
	self.getnotice();
};
LIST_UL.prototype.getnotice = function () {
	var self = this;
	var item = tool.read("food");
	// var rank_arr = new Array(5);
	item.forEach(function(v, i){
		for (var j = 0; j <= item.length - i - 1; j++) {
			if(!item[j+1])break;
			var j_expire = new Date(item[j]['expire']);
			var j_1_expire = new Date(item[j+1]['expire']);
			if(item[j+1] && j_expire.getTime() > j_1_expire.getTime()){
				shift(item, j, j+1);
			}
			
		};

	});
	console.log(item);
	$('#notice').find('ul').empty();
	var notice_count = 0;
	for (var i = 0; i <= item.length - 1; i++) {
		var expire = new Date(item[i]['expire']);
		var today = new Date();
		var remain = (expire - today) / (24*60*60*1000);
		if(notice_count < 5){
			if(remain < 3 && remain > 0){
				$('#notice').css('display', 'block');
				var month = expire.getMonth() + 1;
				var date = expire.getDate();
				$('#notice').find('ul').append('<li><span class="name">'+item[i]['name']+'</span>&nbsp;<span class="date">('+month+'/'+date+')</span></li>')
			}else if(remain < 0){
				$('#notice').css('display', 'block');
				var month = expire.getMonth() + 1;
				var date = expire.getDate();
				$('#notice').find('ul').append('<li class="red"><span class="name">'+item[i]['name']+'</span>&nbsp;<span class="date">(已過期)</span></li>')
			}

			notice_count++;
		}else{
			break;
		}
	};
};

function shift(array, x, y){
	var tem = array[x];
	array[x] = array[y];
	array[y] = tem;
	return array;
}


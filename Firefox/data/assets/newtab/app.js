Date.prototype.stringFormat = function () {
	var y = this.getFullYear();
	var m = this.getMonth() + 1;
	var d = this.getDate();
	var pad = '00';
	return y + "-" + (pad + m).slice(-pad.length) + "-" + (pad + d).slice(-pad.length);
};
function FRIDGE() {
	var self = this;
	self.UI = $('#right-part').find('.fridge');
	return self;
}

FRIDGE.prototype.putFood = function (arr) {
	var self = this;
	var food = arr || tool.read('food');
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
function INFO() {
	var self = this;
	self.UI = $('#info');
	self.name = self.UI.find('.name');
	self.date = self.UI.find('.date');
	return self;
}

INFO.prototype.updateName = function () {
	var self = this;
	var name = tool.read('username') || 'Stranger';
	self.name.text(name);
	return self;
};

INFO.prototype.updateDate = function () {
	var self = this;
	var now = new Date();
	self.date.text(now.getMonth() + 1 + "/" + now.getDate());
	return self;
};
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
	}else if(!isNaN(quantity)){
		$('.list_block').find('.wrapper').find('ul').find('li').eq(index).find('.num').text("x "+quantity);
	}else{
		alert(quantity);
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


var windowH;

$(function () {
	start();

	windowH = $(window).height();

	$('#left-part .add-item').on( 'click', function(){
		$('#left-part .add-form').hasClass('hide') ? $('#left-part .add-form').removeClass('hide') : $('#left-part .add-form').addClass('hide');
	});

	$('#left-part .my-list').on( 'click', function(){
		$('#left-part .list_block').hasClass('hide') ? $('#left-part .list_block').removeClass('hide') : $('#left-part .list_block').addClass('hide');
	});
	
	var types_container =  $('#left-part .food_types');
	for(var i = 1; i < 25; i+=1){
		var $img = $('<img>');
		$img.attr({'src': 'assets/newtab/images/food_type/t'+i+".png",
					'alt': i});
		types_container.append($img);
	}
	types_container.on('click', 'img', function(e){
		$('#left-part .food_type').attr({'src': $(this).attr('src'),
										  'alt': $(this).attr('alt')});
		$('#left-part .food_types').toggle('show');
	});
	$('#left-part .food_type').on('click', function(){
		$('#left-part .food_types').toggle('show');
	});

	function start() {
		window.INFO = new INFO();
		window.LIST = new LIST();
		window.FRIDGE = new FRIDGE();
		if( IsThisFirstTime() ) {
			askUserName();
			tool.tutorialStart();
		} else {
			$('#askOverlay').remove();
			FRIDGE.putFood();
		}
		getToday();
		INFO.updateName().updateDate();
	}

	function getToday() {
		var nowTime = new Date();
		var nowMonth = nowTime.getMonth() +1;
		var nowDate = nowTime.getDate();

		$('#left-part .today .month').text( nowMonth );
		$('#left-part .today .date').text( nowDate );
	}

	function askUserName() {
		// show the question to ask the username
		$('#askOverlay').removeClass('hidden');

		// if ENTER be pressed 
		$('#askOverlay').keypress( function(e){
			if( e.keyCode == 13 ) {
				var name = $('#askOverlay input').val();
				tool.write( "username", name );
				INFO.updateName();

				$(this).addClass('animated bounceOut hide');
				// $(this).remove();
			}
		});
	}

	function IsThisFirstTime() {
		return !tool.read( "username" );
	}

});
window.username = '';
window.food = '';
window.food_arr = [];

window.tool = {
	read:function(key){
		if (!supportLocalStorage()) {
		    return false;
		}
		switch(key){
			case "username":
				username = localStorage["username"];
	        	return username;
			break;

			case "food":
				food = localStorage["food"] || "[]";
				food_arr = JSON.parse(food);
	        	return food_arr;
			break;

			default:
				return true;
			break;
		}
	},
	write:function(key, value){
		if (!supportLocalStorage()) {
		    return false;
		}
		switch(key){
			case "username":
	        	localStorage["username"] = value;
	        	return true;
			break;

			case "food":
				food_arr.push(value);
				food = JSON.stringify(food_arr);
	        	localStorage["food"] = food;
	        	return true;
			break;

			default:
			break;
		}
	},
	remove:function(key, index){
		if (!supportLocalStorage()) {
		    return false;
		}
		switch(key){
			case "food":
				food_arr.splice(index, 1);
				food = JSON.stringify(food_arr);
				localStorage['food'] = food;
				return true;
			break;

		}
	},
	ifexpired:function(expire_date){
		var expire = new Date(expire_date);
		var today = new Date();
		var remain_days = (expire - today) / (1000 * 60 * 60 * 24);
		if(remain_days < 1 && remain_days > 0)
			remain_days = "即將過期";
		else if(remain_days < 0)
			remain_days = "已經過期";
		else
			remain_days = Math.round( parseInt(remain_days) ) + " days";
		return remain_days;
	},
	update:function(key, index, obj){
		switch(key){
			case "food":
				food_arr[index]['top'] = obj['top'];
				food_arr[index]['left'] = obj['left'];
				food = JSON.stringify(food_arr);
				localStorage['food'] = food;
				return true;
			break;
			case "quantity":
				if(food_arr[index]['quantity'] > obj['quantity']){
					food_arr[index]['quantity'] -= obj['quantity'];
					food = JSON.stringify(food_arr);
					localStorage['food'] = food;
					return food_arr[index]['quantity'];
				}else if(food_arr[index]['quantity'] == obj['quantity']){
					tool.remove('food', index);
					return 0;
				}else{
					return '數字輸入有誤';
				}
			break;
			default:
				return false;
			break;
		}

	}

};

tool.tutorialStart = function () {
	var temp = '[{"name":"雞蛋","buydate":"2015-01-10","expire":"2015-02-19","quantity":"10","type":"assets/newtab/images/food_type/t6.png","top":"344px","left":"164px"},{"name":"牛","buydate":"2015-02-01","expire":"2015-02-28","quantity":"2","type":"assets/newtab/images/food_type/t13.png","top":"431px","left":"88px"},{"name":"蔬菜","buydate":"2015-02-01","expire":"2015-02-07","quantity":"2","type":"assets/newtab/images/food_type/t17.png","top":"336px","left":"82px"},{"name":"可樂","buydate":"2015-02-01","expire":"2015-02-11","quantity":"1","type":"assets/newtab/images/food_type/t1.png","top":"325px","left":"266px"},{"name":"鮮魚","buydate":"2015-02-01","expire":"2015-02-05","quantity":"1","type":"assets/newtab/images/food_type/t14.png","top":"242px","left":"114px"},{"name":"潛艇堡","buydate":"2015-02-01","expire":"2015-02-17","quantity":"1","type":"assets/newtab/images/food_type/t8.png","top":"236px","left":"204px"},{"name":"大西瓜","buydate":"2015-02-01","expire":"2015-02-15","quantity":"1","type":"assets/newtab/images/food_type/t19.png","top":"430px","left":"171px"},{"name":"米塔蛋糕","buydate":"2015-01-20","expire":"2015-02-02","quantity":"1","type":"assets/newtab/images/food_type/t10.png","top":"423px","left":"276px"}]';
	food_arr = JSON.parse(temp);
	FRIDGE.putFood(food_arr);
};

tool.getDiffDays = function (from, to) {
	if (typeof from === 'string')
		from = new Date(from);
	if (typeof to === 'string')
		to = new Date(to);
	
	var diffS = to.getTime() - from.getTime();
	d = diffS/1000/60/60/24;
	return d;
};
function supportLocalStorage(){
	if(!localStorage){
		return false;
	}else{
		return true;
	}
}
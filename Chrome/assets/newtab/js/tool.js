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
					alert('數字輸入有誤');
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
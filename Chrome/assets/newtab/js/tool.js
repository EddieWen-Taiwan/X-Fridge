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
			default:
				return false;
			break;
		}

	}

};

tool.tutorialStart = function () {
	$('<div class="step1"></div>').appendTo($('#left-part'));
	$('#left-part .add-item').on( 'click', function(){
		$('.step1').remove();
	});
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
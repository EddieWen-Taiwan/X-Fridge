
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
				food = localStorage["food"];
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
	        	localStorage["food"] = JSON.stringify(food_arr);
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
				food_arr = splice(index, 1);
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
	}

}

function supportLocalStorage(){
	if(!localStorage){
		return false;
	}else{
		return true;
	}
}
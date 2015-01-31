
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
	}

}

function supportLocalStorage(){
	if(!localStorage){
		return false;
	}else{
		return true;
	}
}
Date.prototype.stringFormat = function () {
	var y = this.getFullYear();
	var m = this.getMonth() + 1;
	var d = this.getDate();
	return y + "-" + m + "-" + "d";
};
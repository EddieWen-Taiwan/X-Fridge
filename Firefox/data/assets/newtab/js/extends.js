Date.prototype.stringFormat = function () {
	var y = this.getFullYear();
	var m = this.getMonth() + 1;
	var d = this.getDate();
	var pad = '00';
	return y + "-" + (pad + m).slice(-pad.length) + "-" + (pad + d).slice(-pad.length);
};
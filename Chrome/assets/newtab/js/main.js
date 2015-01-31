$(function () {
	start();

	function start() {
		window.INFO = new INFO();
		window.LIST = new LIST();
		INFO.updateName().updateDate();
	}
})
$(function () {
	start();

	function start() {

		askUserName();

		window.INFO = new INFO();
		window.LIST = new LIST();
		INFO.updateName().updateDate();
	}

	function askUserName() {
		
	}

});
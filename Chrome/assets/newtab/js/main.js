$(function () {
	start();

	$('#askOverlay').on( 'click', function(){
		$(this).addClass('hidden');
	});

	function start() {

		askUserName();

		window.INFO = new INFO();
		window.LIST = new LIST();
		INFO.updateName().updateDate();
	}

	function askUserName() {
		$('#askOverlay').removeClass('hidden');
	}

});
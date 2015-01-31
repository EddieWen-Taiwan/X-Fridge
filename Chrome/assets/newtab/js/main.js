$(function () {
	start();

	$('#askOverlay').keypress( function(e){
		if( e.keyCode == 13 ) {
			var name = $('#askOverlay').val();
			console.log( name );
		}
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
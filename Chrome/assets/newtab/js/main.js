$(function () {
	start();

	function start() {

		if( IsThisFirstTime() ) {
			askUserName();
		} else {
			$('#askOverlay').remove();
		}

		window.INFO = new INFO();
		window.LIST = new LIST();
		INFO.updateName().updateDate();
	}

	function askUserName() {
		// show the question to ask the username
		$('#askOverlay').removeClass('hidden');

		// if ENTER be pressed 
		$('#askOverlay').keypress( function(e){
			if( e.keyCode == 13 ) {
				var name = $('#askOverlay input').val();
				tool.write( "username", name );
				INFO.updateName();

				$(this).remove();
			}
		});
	}

	function IsThisFirstTime() {
		return !tool.read( "username" );
	}

});
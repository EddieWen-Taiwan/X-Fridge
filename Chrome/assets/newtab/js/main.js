$(function () {
	start();

	$('#left-part .add-item').on( 'click', function(){
		$('#left-part .add-form').hasClass('hide') ? $('#left-part .add-form').removeClass('hide') : $('#left-part .add-form').addClass('hide');
	});

	$('#left-part .my-list').on( 'click', function(){
		var list = $('#left-part .list_block');
		if( list.hasClass('hide') ) {
			$('#left-part .list_block').css( 'height', 'auto' );
			var thisHeight = $('#left-part .list_block').height();
			$('#left-part .list_block').css( 'height', '0px' ).animate({
				'height': thisHeight
			}, 700);
		} else {
			list.animate({
				'height': '0px'
			}, 700);
		}
	});

	function start() {

		if( IsThisFirstTime() ) {
			askUserName();
			
		} else {
			tool.tutorialStart();
			$('#askOverlay').remove();
		}

		window.INFO = new INFO();
		window.LIST = new LIST();
		window.FRIDGE = new FRIDGE();
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

				$(this).addClass('animated bounceOut');
				// $(this).remove();
			}
		});
	}

	function IsThisFirstTime() {
		return !tool.read( "username" );
	}

});
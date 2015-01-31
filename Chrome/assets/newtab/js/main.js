var windowH;

$(function () {
	start();

	windowH = $(window).height();

	$('#left-part .add-item').on( 'click', function(){
		$('#left-part .add-form').hasClass('hide') ? $('#left-part .add-form').removeClass('hide') : $('#left-part .add-form').addClass('hide');
	});

	$('#left-part .my-list').on( 'click', function(){
		// var list = $('#left-part .list_block');
		// if( list.hasClass('hide') ) {
		// 	list.css( 'height', 'auto' );
		// 	var thisHeight = list.height();
		// 	list.css( 'height', '0px' ).animate({
		// 		'height': thisHeight
		// 	}, 700).removeClass('hide');
		// 	$('#left-part .add-form').hasClass('hide') ? list.css( 'max-height', windowH -210 ) : list.css( 'max-height', windowH -490 );
		// } else {
		// 	list.animate({
		// 		'height': '0px'
		// 	}, 700).addClass('hide');
		// }
		$('#left-part .list_block').hasClass('hide') ? $('#left-part .list_block').removeClass('hide') : $('#left-part .list_block').addClass('hide');
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
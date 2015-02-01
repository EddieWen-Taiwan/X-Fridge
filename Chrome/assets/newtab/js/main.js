var windowH;

$(function () {
	start();

	windowH = $(window).height();

	$('#left-part .add-item').on( 'click', function(){
		$('#left-part .add-form').hasClass('hide') ? $('#left-part .add-form').removeClass('hide') : $('#left-part .add-form').addClass('hide');
	});

	$('#left-part .my-list').on( 'click', function(){
		$('#left-part .list_block').hasClass('hide') ? $('#left-part .list_block').removeClass('hide') : $('#left-part .list_block').addClass('hide');
	});
	
	var types_container =  $('#left-part .food_types');
	for(var i = 1; i < 25; i+=1){
		var $img = $('<img>');
		$img.attr({'src': 'assets/newtab/images/food_type/t'+i+".png",
					'alt': i});
		types_container.append($img);
	}
	types_container.on('click', 'img', function(e){
		$('#left-part .food_type').attr({'src': $(this).attr('src'),
										  'alt': $(this).attr('alt')});
		$('#left-part .food_types').toggle('show');
	});
	$('#left-part .food_type').on('click', function(){
		$('#left-part .food_types').toggle('show');
	});

	function start() {
		window.INFO = new INFO();
		window.LIST = new LIST();
		window.FRIDGE = new FRIDGE();
		if( IsThisFirstTime() ) {
			askUserName();
			tool.tutorialStart();
		} else {
			$('#askOverlay').remove();
			FRIDGE.putFood();
		}
		getToday();
		INFO.updateName().updateDate();
	}

	function getToday() {
		var nowTime = new Date();
		var nowMonth = nowTime.getMonth() +1;
		var nowDate = nowTime.getDate();

		$('#left-part .today .month').text( nowMonth );
		$('#left-part .today .date').text( nowDate );
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

				$(this).addClass('animated bounceOut hide');
				// $(this).remove();
			}
		});
	}

	function IsThisFirstTime() {
		return !tool.read( "username" );
	}

});
jQuery(document).ready(function($){
	var page = $('body').attr('id');
	if(page == 'page-home'){
		$('a.scroll').on('click', function(event) {
			var target = $(this).attr('href');
			console.log(target);

			if( target.length ) {
					event.preventDefault();
					$('html, body').animate({
							scrollTop: $(target).offset().top
					}, 1000);
			}

		});
		var videosArray = [
			'video1',
			'video2',
			'video3',
			'video4',
			'video5'
		];
		var videosPlayed = [];
		var videosContent = {
			'video1':{
				'title': '"Tengo constancia de mi puntualidad. Donde est&eacute; y en cualquier momento me puedo registrar"'
			},
			'video2':{
				'title': '"Gracias a CTRL IT logr&eacute; reducir casi un 80% el pago de horas extras"'
			},
			'video3':{
				'title': '"No importa donde est&eacute;, con un solo click puedo monitorear todas las sucursales del pa&iacute;s"'
			},
			'video4':{
				'title': '"Gracias a CTRL IT podr&aacute;s medir productividad y obtener inteligencia para ser una empresa m&aacute;s competitiva"'
			},
			'video5':{
				'title': '"CTRL IT se adapt&oacute; a mi negocio y nos entreg&oacute; acceso a indicadores e informaci&oacute;n que desconoc&iacute;amos"'
			}
		}
		//var randomVideo = Math.floor(Math.random()*videosArray.length);

		var overlay = $('.video-overlay');
		var videoSettings = {
			volume: 0,
			playbackRate: 1,
			muted: true,
			loop: false,
			autoplay: true,
			position: '50% 50%', // Similar to the CSS `background-position` property.
			posterType: 'jpg', // Poster image type. "detect" — auto-detection; "none" — no poster; "jpg", "png", "gif",... - extensions.
			resizing: true, // Auto-resizing, read: https://github.com/VodkaBears/Vide#resizing
			bgColor: 'transparent', // Allow custom background-color for Vide div,
			className: 'videoObj' // Add custom CSS class to Vide div
		};
		playVideo();
		function playVideo(){
			$('#theVideo').removeClass('visible');
			console.log('Video remove class visible');
			var randomVideo = Math.floor(Math.random()*videosArray.length);
			var played = $.inArray(videosArray[randomVideo], videosPlayed);
			if(played > -1){
				//already played
				if(videosArray.length == videosPlayed.length){
					//all videos played
					videosPlayed = [];
				}
				playVideo();
			} else {
				//not played yet
				videosPlayed.push(videosArray[randomVideo]);
				var videoR = videosContent[videosArray[randomVideo]];
				overlay.find('h1').html(videoR.title);
				overlay.attr('class', 'video-overlay '+videosArray[randomVideo]);
				$('#theVideo').vide('assets/video/'+videosArray[randomVideo], videoSettings);
				var video = $('#theVideo').data('vide').getVideoObject();
				if(getMobileOS() == 'desktop'){
					video.onended = function() {
							overlay.hide();
							overlay.removeClass('visible');
							playVideo();
					};
					video.oncanplay = function(){			
						 $('#theVideo').addClass('visible');
							overlay.show();
							setTimeout(function(){
								overlay.addClass('visible');
							}, 1000);
					}
				} else if(getMobileOS() == 'mobile'){
						$('#theVideo').addClass('visible');
					overlay.show();
						setTimeout(function(){
								overlay.addClass('visible');
							}, 1000);
						setTimeout(function(){
							overlay.hide();
							overlay.removeClass('visible');
							playVideo();
						}, 9000);
				}
			}
		}
	} else {
		$('.cd-header').addClass("sticky");
		$('#servicios').css('margin-top', '2em');
	}
	$('.cd-primary-nav').click(function(){
			if($(window).width() <= 768){
				if(page == "page-home"){
					var vH = $('#theVideo').height();
					var nav = $('.cd-header');
					if ($(window).scrollTop() < vH){ 
						$('html, body').animate({
								scrollTop: nav.offset().top
						}, 500);
						console.log("needs scrolling");
					}
				}
				$(this).find('ul').toggleClass('closed');
			}
		});
	setSizes(page);
		$(window).resize(function(){
			setSizes(page);
		});
});


function setSizes(page){
	var wW = $(window).width();
	var wH = $(window).height();
	if(page == 'page-home'){
		var headH = $('.cd-header').height();
		var minusH = wH - headH;
		var oc = $('.video-content').height();
		if(wW > wH){
			$('#video').width(wW).height(minusH);
			$('#theVideo').width(wW).height(minusH);
		} else if(wW < wH){
			minusH = (wH /2);
			$('#video').width(wW).height(wH /2);
			$('#theVideo').width(wW).height(wH /2);
		}

		$('.video-content').css('opacity', '1');
		$(window).scroll(function() {
			if ($(this).scrollTop() > minusH){  
				$('.cd-header').addClass("sticky");
				$('#servicios').css('margin-top', headH);
			}
			else{
				$('.cd-header').removeClass("sticky");
				$('#servicios').css('margin-top', '0');
			}
		});
	}
	
	if(wW <= 768){
		$('.cd-primary-nav ul').addClass('closed');
		
	}
}
function getMobileOS() {
  var userAgent = navigator.userAgent || navigator.vendor || window.opera;

  if( userAgent.match( /iPad/i ) || userAgent.match( /iPhone/i ) || userAgent.match( /iPod/i ) || userAgent.match( /Android/i ) ){
    return 'mobile';

  }
  else{
    return 'desktop'; 
  }
}

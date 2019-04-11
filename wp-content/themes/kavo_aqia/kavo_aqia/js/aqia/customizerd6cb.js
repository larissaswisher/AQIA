Pace.on('done', function() {
  jQuery( '#topbar' ).fadeIn();
  jQuery( '#landing-page' ).fadeIn();
});
Pace.on('start', function(){
	setTimeout( function(){
		jQuery( '.pace' ).css( 'background-color', '#DDD' );
		jQuery( '.pace-progress' ).show();
	}, 200 );
});
jQuery( document ).on( 'ready', function(){
	//simulationStep2();
	jQuery( '#the-custom-button' ).trigger( 'click' ); 
});

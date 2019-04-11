/* [INIT FUNCTIONS] */

var root = '';

BrowserDetect.init();

jQuery( document ).on( 'tubularEnded', function(){
    onVideoEnded();
});

jQuery( document ).on('ready', function(){

    root = jQuery( 'body' );

    root.on( 'keydown', function( event ){
        if( event.keyCode == 37 || event.keyCode == 39 ){
            var screenWidth = document.documentElement.clientWidth || document.body.clientWidth;
            if( screenWidth > 768 ){
                event.preventDefault();
                event.stopPropagation();
            }
        }
    });

    var tag = document.createElement('script');
    tag.src = "http://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    if( root.hasClass( 'home' ) ){

        var canPlay = AQIAData.playvideo;
            canPlay = isMob() ? '0' : canPlay;
  
        if( canPlay == '1' ){
            jQuery( '#tub' ).tubular({
                videoId : 'gC_eJO3BiuA',
                repeat : false,
                start : 0
            });
            setTimeout( function(){
                if( ! jQuery( 'body' ).hasClass( 'tubular-playing' ) ){
                    jQuery( '#tub' ).tubular({
                        videoId : 'gC_eJO3BiuA',
                        repeat : false,
                        start : 0
                    });
                }
            }, 1000);
        }

        doFullPage();

        jQuery( document ).on('click', '.section-nav', function(){
          jQuery.fn.fullpage.moveSectionDown();
        });
        jQuery( '#menu-home' ).find( 'a[href="#cadeira"]' ).on( 'click', function(){
          jQuery.fn.fullpage.moveTo( 2, 0 );
        });


        jQuery( document ).on( 'click', '.nav-link:visible', function( e ){
            e.preventDefault();
            var link = jQuery( this );
            if( link.hasClass( 'active' ) ) return;
            var ref = link.data( 'ref' );
            jQuery( '.nav-background-' + ref ).removeClass( 'active' );
            jQuery( '.animated-content-' + ref ).hide();
            jQuery( '.nav-background-' + ref + '.key-' + link.data( 'key' ) ).addClass( 'active' );
            jQuery( '.animated-content-' + ref + '.key-' + link.data( 'key' ) ).fadeIn( 600 );
            jQuery( '.nav-link[data-ref="' + ref + '"]' ).removeClass( 'active' );
            link.addClass( 'active' );
        });

        jQuery( document ).on( 'click', '.nav-link-animation', function( e ){
            e.preventDefault();
            var link = jQuery( this );
            if( link.hasClass( 'animating' ) ) return;
            var ref = link.data( 'ref' );
            var elements = jQuery( '.nav-background-' + ref );
            var index = 0;
            var loop = function() {
                var element = jQuery( elements[index] );
                element.fadeIn( 500, function(){
                    index = index + 1 < elements.length ? index + 1 : 0;
                    if( index == 0 ){
                        jQuery( '.nav-background-' + ref  + '.key-0' ).fadeIn( 500, function(){
                            jQuery( '.nav-background-' + ref ).not( '.key-0' ).css( 'opacity', 0 );
                        });
                    }else{
                        loop();
                    }
                });
            };
            loop();
        });
    }
    jQuery( '#menu-features-container .menu' ).append( '<li id="download-catalog-mobile" class="menu-item"><span id="download-catalog-mobile-inner" class="inner"></span></li>' );
    jQuery( '.download-catalog' ).clone().appendTo( '#download-catalog-mobile-inner' );

    var logoImg = jQuery( '#logo-desktop' );
    jQuery( '#menu-features-container .menu' ).append( '<li id="menu-features-logo"><img src="' + logoImg.attr( 'src' ) + '" width="280" alt="' + logoImg.attr( 'alt' ) + '" /></li>' );

    jQuery( '#mobile-menu-icon' ).on( 'click', function(){
        root.toggleClass( 'mobile-menu-active' );
    });

    jQuery( '#menu-features-container .menu' ).on( 'click', 'a', function(){
        if( root.hasClass( 'mobile-menu-active' ) ){
            var menu = jQuery( this ).parent();
            jQuery( '#menu-features-container .menu' ).find( '.active' ).removeClass( 'active' ).removeClass( 'active-on' );
            menu.addClass( 'active active-on');
        }
    });

    jQuery( '#menu-features-container' ).append( '<a id="mobile-menu-alt-icon" class="mobile-menu-icon white"></a>' );
    jQuery( '#mobile-menu-alt-icon' ).on( 'click', function(){
        jQuery( '#mobile-menu-icon' ).trigger( 'click' );
    });
});

function isMob(){
    var viewport = document.documentElement.clientWidth || document.body.clientWidth;
    return viewport <= 768 ? true : false;
}

function doFullPage(){
    var viewport = document.documentElement.clientWidth || document.body.clientWidth;
    var isMob = viewport <= 768 ? true : false;

    if( viewport > 768 ){
        jQuery( '#subsection-cache' ).find( '.section' ).each( function( i ){
            var subsection = jQuery( this );
            subsection.insertAfter( jQuery( '#' + subsection.data( 'parent' ) ) );
        });
    }else{
        jQuery( '.section-mob-hide' ).appendTo( '#subsection-cache' );
    }
    
    var anchors = [];

    jQuery( '#single-site' ).find( '.section' ).each( function(){
        var slide = jQuery( this );
        jQuery('.page-item-' + slide.data( 'menu-item' )).attr('data-menuanchor', slide.data( 'slug' ) );
        jQuery('.page-item-' + slide.data( 'menu-item' )).find( 'a' ).attr('href', '#' + slide.data( 'slug' ) );
        if( slide.hasClass( 'subsection' ) ){
          anchors.push( slide.data( 'slug' ) + '-2' );
        }else{
          anchors.push( slide.data( 'slug' ) );
        }
    });

    jQuery( '#single-site').fullpage({
        scrollingSpeed: 1000,
        responsive : 1,
        anchors : anchors,
        controlArrows : false,
        navigation : true,
        slidesNavigation: true,
        slidesNavPosition: 'bottom',
        normalScrollElements: '#section-footer',
        scrollOverflow: true,
        menu : '#menu-features-container .menu',
        onLeave : function( index, direction ){
          var fpNav = jQuery( '#fp-nav' );
          var menuFeatures = jQuery( '#menu-features-container .menu' );
          
          //Força o bullet ficar com aparência de ativado até que se saiba se deve ser trocado
          fpNav.find( '.active').addClass( 'active-persist' );
          
          //Força o menu ficar com aparência de ativado até que se saiba se deve ser trocado
          menuFeatures.find( '.active').addClass( 'active-persist' );

        },
        afterLoad : function( anchorLink ){

          var fpNav = jQuery( '#fp-nav' );
          var menuFeatures = jQuery( '#menu-features-container .menu' );
          
          //Verifica se o bullet deve ser trocado ou não por conta das subessões
          fpNav.find( 'a' ).removeClass( 'active-on' );
          fpNav.find( '.active-persist' ).removeClass( 'active-persist' );
          if( fpNav.find( '.active').hasClass( 'hide' ) ){
            fpNav.find( '.active').removeClass( 'active' ).parent().prev().find( 'a' ).addClass( 'active' );
          }
          fpNav.find( '.active' ).addClass( 'active-on' );
          
          //Verifica se o menu deve ser trocado ou não por conta das subessões
          menuFeatures.find( '.menu-item' ).removeClass( 'active-on' );
          menuFeatures.find( '.active-persist' ).removeClass( 'active-persist' );
          if( menuFeatures.find( '.menu-item[data-menuanchor="' + anchorLink + '"]').length == 0 ){
            menuFeatures.find( '.menu-item[data-menuanchor="' + anchorLink.replace( '-2', '' ) + '"]').addClass( 'active' );
          }
          menuFeatures.find( '.active' ).addClass( 'active-on' );

          //jQuery( '.section-nav' ).fadeIn( 'fast' );

          jQuery( '#mobile-menu-icon-text' ).html( menuFeatures.find( '.active' ).text() );

          if( root.hasClass( 'mobile-menu-active' ) ){
            jQuery( '#mobile-menu-icon' ).trigger( 'click' );
          }

        },
        afterRender : function(){
          jQuery( '#fp-nav' ).find( 'a' ).each( function(){
            var a = jQuery( this );
            if( a.attr( 'href' ).match( '-2' ) ){
              a.addClass( 'hide' ).parent().addClass( 'hide' );
            }
          });
          jQuery( '#fp-nav' ).find( '.active' ).addClass( 'active-on' );
        }
    });
}
/* [/INIT FUNCTIONS] */

/* [DOCUMENT READY EVENTS] */

jQuery(document).ready(function(){

  equalHeight();

  var root = jQuery( 'body' );

    if( root.hasClass( 'home' ) ){
        
    }

    window.scrollTo( 0,0 );

    if(is_ie8()){
      jQuery('html').addClass('isie8');
    }

    /*
    jQuery('#chair-preview ').find('.over-image:visible img').each(function(){
      var img = jQuery(this);
      img.attr('src', img.data('original')).removeClass('lazy');
    });
    */
    /*
    jQuery("img.lazy").lazyload({
        event : "klazy"
    });
    */
    //jQuery("img.lazy").lazyload();

    //Inicia os slides da #screen-2
    jQuery('#slides').superslides();

    jQuery('#slides .slides-pagination a').addClass('pie relative');
    jQuery('.progress-ball').addClass('pie relative');

    //Dropdown customizador para os campos select de formulários
    jQuery('.aqia-form .gfield select').customSelect();

    if(!is_ie8()){
      jQuery('#reel360').on('up', function(){
        setTimeout(function(){
         jQuery('#reel360').trigger('reach', [1, 0.5]);
        }, 1000);
      });

      jQuery('#reel360').on('down', function(){
        jQuery('.t60-drag').hide();
      });

      jQuery('#reel360').on('stop', function(){
        jQuery('.t60-drag').fadeIn('fast');
      });

      jQuery('#reel360').on('loaded', function(){
        jQuery('.t60-loading-msg').fadeOut('fast');
        setTimeout(function(){
          jQuery('.t60-drag').removeClass('hiddeous').hide().fadeIn('fast');
        }, 1000);
      });

      jQuery('#reel360').on('resize', function(){
        setTimeout(function(){
          jQuery('#reel360').trigger('click');
        }, 500);
      });

    }

    //Se o browser tiver salvo os campos preenchidos dispara os eventos para a estilização
    jQuery('.aqia-form input').trigger('blur');
    jQuery('.aqia-form select').trigger('change');

    //Inicia o scroller customizado
    jQuery('.scrollable').mCustomScrollbar({/*
        advanced:{
            updateOnContentResize: true,
            updateOnBrowserResize: true
        }*/
        callbacks:{
          onInit: function(){
            if(is_ie8()){
              jQuery('.mCSB_dragger_bar').addClass('corner');  
            }
          }
        }
    });
  
    //Usualmente ajusta elementos que precisam do tamanho da tela para serem visualizados corretamente
    onScreenResize();

});



function onVideoEnded(){
  //if( jQuery( '#topbar' ).is( ':visible' ) ) return;
    jQuery('body').removeClass('tubular-playing').addClass('tubular-stopped');
    jQuery('#tubular-container').fadeOut(1000, function(){
        var tubcontainer = jQuery(this);
        jQuery('#close-video').fadeOut('fast');
        jQuery('#video-full').addClass('video-ended');
        //jQuery('#fp-nav').fadeIn( 'slow' );
        //jQuery('#topbar').fadeIn('slow', function(){
            jQuery('#video-full').fadeIn('slow', function(){
                jQuery('#screen-1 .main-content').fadeIn('slow', function(){
                    jQuery('body').show().removeClass('no-scroll');
                    jQuery("img.lazy").trigger("klazy");
                    tubcontainer.remove();
                    jQuery( '#tubular-shield' ).remove();
                });    
            });
        //});
    });
}

function ie8Video(){

  var windowWidth = document.documentElement.clientWidth || document.body.clientWidth;
  var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
  var width = Math.ceil(windowWidth - (windowWidth / 100) * 0.8);
  var height = Math.ceil(windowHeight + (windowHeight / 100) * 9);
  var player = videojs('video', {
    width : width,
    height : height
  });

  player.on('ended', function(){
     onVideoEnded();
  });

  jQuery(window).on('resize', function(){
    var windowWidth = document.documentElement.clientWidth || document.body.clientWidth;
    var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
    var width_p = 0.8;
    if(windowWidth <= 1366){
      width_p = 1;
    }
    if(windowWidth <= 1024){
      width_p = 1.2;
    }

    var width = Math.ceil(windowWidth - (windowWidth / 100) * 0.8);
    var height = Math.ceil(windowHeight + (windowHeight / 100) * 9);
    jQuery('#video-full .video-js').css({
      width : width + 'px',
      height : height + 'px'
    });
  })
}

/* [/DOCUMENT READY EVENTS] */

/* [COMMON EVENTS] */
var a;

jQuery(window).resize(function(){
  clearTimeout(a);
  a = setTimeout(function(){
    onScreenResize();
    chairPreviewCorrection();
    equalHeight();

    if( root.hasClass( 'home' ) ){
        jQuery.fn.fullpage.destroy( 'all' );
        doFullPage();
    }

    },200);
});

var lastScrollTop = 0;

jQuery(window).on('scroll', function(event) {

  var scrollTop = jQuery(window).scrollTop();
  var scrollDirection = '';
  var elementOffset = 0;
  var distanceFromTop = 0;
  var section = null;
  var sectionHeight = 0;
  var distanceToDesconsider = 200;
  var distanceDiff = 0;
  var distanceLimit = 0;
  var st = jQuery(this).scrollTop();

  scrollDirection = st > lastScrollTop ? 'down' : 'up';
  lastScrollTop = st;

  jQuery('.screen').each(function(i){
      section = jQuery(this);
      sectionHeight = section.height();
      elementOffset = section.offset().top;
      distanceFromTop = elementOffset - scrollTop;
      distanceDiff = (sectionHeight + distanceFromTop) - sectionHeight;
      distanceLimit = sectionHeight - distanceToDesconsider;

      if(distanceDiff <= distanceToDesconsider && Math.abs(distanceDiff) <= distanceLimit){
        section.addClass('current-section');
        section.prevAll().removeClass('unviewed');
        if(scrollDirection == 'up'){
          section.next().addClass('unviewed');
        }
      }else{
        section.removeClass('current-section');
      }

      if(section.hasClass('current-section') && section.hasClass('unviewed')){
        anchorToLink('#' + section.attr('id'));
        section.removeClass('unviewed');
        disable_scroll();
        setTimeout(function(){
          enable_scroll();
        }, 1000);

      }

  });

});

/* [/COMMON EVENTS] */

function preventDefault(e) {
  e = e || window.event;
  if (e.preventDefault)
      e.preventDefault();
  e.returnValue = false;  
}

function keydown(e) {
    for (var i = keys.length; i--;) {
        if (e.keyCode === keys[i]) {
            preventDefault(e);
            return;
        }
    }
}

function wheel(e) {
  preventDefault(e);
}

function disable_scroll() {
  if (window.addEventListener) {
      window.addEventListener('DOMMouseScroll', wheel, false);
  }

  window.onmousewheel = document.onmousewheel = wheel;
  document.onkeydown = keydown;
}

function enable_scroll() {
    if (window.removeEventListener) {
        window.removeEventListener('DOMMouseScroll', wheel, false);
    }
    window.onmousewheel = document.onmousewheel = document.onkeydown = null;  
}

function equalHeight(){    
  jQuery( "[data-match-height]" ).each( function() {
    var parentRow = jQuery( this ),
      childrenCols = jQuery( this ).find( "[data-height-watch]" ),
      childHeights = childrenCols.map( function(){ return jQuery( this ).outerHeight(); } ).get(),
      tallestChild = Math.max.apply( Math, childHeights );
      childrenCols.css( 'height', tallestChild );
  });
}

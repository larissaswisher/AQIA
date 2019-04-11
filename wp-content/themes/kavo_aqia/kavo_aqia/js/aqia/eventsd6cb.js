/* [FORMULÁRIOS]*/
/*
 * Location: #step-1
 * Description: Adiciona ou remove o efeito de campo preenchido para campos text
 */
jQuery(document).on('blur', '.aqia-form input', function(){
    var self = jQuery(this);
    if(self.val() != ''){
        self.addClass('filled');
        self.parent().removeClass('has-error');
    }else{
        self.removeClass('filled');
    }
    mirrorInputs(self);
});
/*
 * Location: #step-1
 * Description: Adiciona ou remove o efeito de campo preenchido para campos select
 */
jQuery(document).on('change', '.aqia-form select', function(){
    var self = jQuery(this);
    if( self.hasClass('input-estado') || self.hasClass('input-cidade') ){
        if(self.val() != ''){
            self.next().addClass('filled');
            self.parent().parent().removeClass('has-error');
        }else{
            self.next().removeClass('filled');
        }
    }else{
        if(self.val() != ''){
            self.next().addClass('filled');
            self.parent().removeClass('has-error');
        }else{
            self.next().removeClass('filled');
        }
    }
    mirrorInputs(self);
});

jQuery(document).on('doMake360', function(){
    jQuery('#reel360').trigger('click');
});

jQuery(document).on('change', '.aqia-form select[name="estado"]', function(){
    var uf = jQuery( this ).val();
    if( uf == '' || uf == undefined) return;
    jQuery('.aqia-form select[name="cidade"]').html( '<option value="">Carregando cidades...</option>' );
    jQuery('.kavo-cities .customSelectInner').text( 'Carregando cidades...' );
    jQuery.ajax({
        type: 'post',
        url: AQIAData.ajaxurl, 
        data: {
            '_ajax_nonce': AQIAData.nonce, 
            'action': 'aqia_cities_options_ajax',
            'uf' : uf
        },
        success : function( options ){
            jQuery('.kavo-cities .customSelectInner').text( 'Escolha a cidade' );
            jQuery('.aqia-form select[name="cidade"]').html( options );
        }
    });
});

/*
jQuery(document).on('click', '.aqia-form li', function(){
    jQuery(this).removeClass('has-error');
});
*/
/* [/FORMULÁRIOS]*/
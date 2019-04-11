/* [COMMON ELEMENTS ANIMATIONS]*/
function validateFields(which){
    var html = '';
    var hasError = false;
    
    var field = jQuery('.input-name.' + which);
    if(field.val() == ''){
        html+= '<li>' + field.attr('placeholder') + '</li>';
        field.parent().addClass('has-error');
        hasError = true;
    }

    if(which == 'share-input'){
        field = jQuery('.input-friend-email.' + which);
        if(!validateEmail(field.val())){
            html+= '<li>' + field.attr('placeholder') + '</li>';
            field.parent().addClass('has-error');
            hasError = true;
        }
    }else{
        field = jQuery('select.input-area_atuacao.' + which);
        if(field.val() == ''){
            html+= '<li>' + field.find('option:first').text() + '</li>';
            field.parent().addClass('has-error');
            hasError = true;
        }
    }

    field = jQuery('.input-email.' + which);
    if(!validateEmail(field.val())){
        html+= '<li>' + field.attr('placeholder') + '</li>';
        field.parent().addClass('has-error');
        hasError = true;
    }

    field = jQuery('.input-phone.' + which);
    if(field.val() == ''){
        html+= '<li>' + field.attr('placeholder') + '</li>';
        field.parent().addClass('has-error');
        hasError = true;
    }

    field = jQuery('.input-country.' + which);
    if(field.length && field.val() == ''){
        html+= '<li>' + field.attr('placeholder') + '</li>';
        field.parent().parent().addClass('has-error');
        hasError = true;
    }

    field = jQuery('.input-estado.' + which);
    if(field.val() == ''){
        html+= '<li>' + AQIAData.strings.state + '</li>';
        field.parent().parent().addClass('has-error');
        hasError = true;
    }

    field = jQuery('.input-cidade.' + which);
    if(field.val() == ''){
        html+= '<li>' + AQIAData.strings.city + '</li>';
        field.parent().parent().addClass('has-error');
        hasError = true;
    }

    if(hasError){
        jQuery('.form-clousure').hide();
        jQuery('.form-validation-result .validated-fields').html(html);
        jQuery('.form-validation-result').show();
        return false;
    }else{
        return true;
    }

}
function validateEmail(email) { 
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
} 
function showShareWindow(){
    jQuery('#custom-top').fadeOut();
    jQuery('#custom-bottom').fadeOut();
    hideCustomizer(function(){
        showOverlayer(function(){
            jQuery('#system-messages .info-window').hide();
            jQuery('#share-mail').show();
            jQuery('#system-messages').show();
        });
    });
    jQuery('.step-back').data('action', 'close-system-messages');
}
/*
 * Confirm window
 */
 function confirmWindow(msg_key, func){
    var _function = function(){};
    func = typeof func !== 'undefined' ? func : _function;
    jQuery('#custom-top').fadeOut();
    jQuery('#custom-bottom').fadeOut();
    hideCustomizer(function(){
        jQuery('#over-images').hide();
        showOverlayer(function(){
            jQuery('#system-messages .info-window').hide();
            jQuery('#system-messages .share-window').hide();
            jQuery('#' + msg_key).show();
            jQuery('#system-messages').show();
        });
    });
    jQuery('#' + msg_key + ' .square-button').on('click', function(){
        if(jQuery(this).data('value') == 1){
            func();
        }
        jQuery('.step-back').data('action', 'close-system-messages');
        jQuery('.step-back').trigger('click');
    });
 }
/*
 * Abre a overlayer com o efeito blur
 */
function showOverlayer(callback, instant){
    var _function = function(){};
    callback = typeof callback !== 'undefined' ? callback : _function;
    instant = typeof instant !== 'undefined' ? instant : false;
    jQuery('.screen').addClass('blur-container');
    jQuery('html, body').addClass('no-scroll');
    if(instant){
        jQuery('.overlayer').show();
        callback();
    }else{
        jQuery('.overlayer').fadeIn(function(){
            callback();
        });
    }
}
/*
 * Fecha a overlayer com o efeito blur
 */
function hideOverlayer(keep_no_scroll, callback){
    keep_no_scroll = typeof keep_no_scroll !== 'undefined' ? keep_no_scroll : false;
    var _function = function(){};
    callback = typeof callback !== 'undefined' ? callback : _function;
    jQuery('.screen').removeClass('blur-container');
    jQuery('.overlayer').fadeOut(function(){
        if(!keep_no_scroll){
            jQuery('html, body').removeClass('no-scroll');
        }
        callback();
    });
}
function toggleCustomizer(callback){
    var _function = function(){};
    callback = typeof callback !== 'undefined' ? callback : _function;
    if(jQuery('#custom-sidebar').hasClass('sidebar-hidden')){
        showCustomizer(callback);
    }else{
        hideCustomizer(callback);
    }
}
/*
 * Mostra a sidebar com o configurador
 */
function showCustomizer(callback){
    var sidebar_width = jQuery('#custom-sidebar').css('width');
    var right = '+=' + 0;
    if(BrowserDetect.browser == 'Explorer' && BrowserDetect.version <= 9){
        right = 0;
    }
    var _function = function(){};
    callback = typeof callback !== 'undefined' ? callback : _function;
    jQuery('#custom-sidebar').animate({
        right : right
    }, 400, function(){
        jQuery('#custom-sidebar').removeClass('sidebar-hidden');
        callback();
    });
}
/*
 * Recolhe a sidebar com o configurador
 */
function hideCustomizer(callback){
    var sidebar_width = jQuery('#custom-sidebar').css('width');
    var _function = function(){};
    callback = typeof callback !== 'undefined' ? callback : _function;
    jQuery('#custom-sidebar').animate({
        right : '-=' + sidebar_width 
    }, 400, function(){
        jQuery('#custom-sidebar').addClass('sidebar-hidden');
        callback();
    });
}
/*
 * Clona os itens vazios do customizador
 */
function customizerCopyEmptyValues(){
    var custom_item = '';
    jQuery('#validation-custom-itens').html('');
    jQuery('#custom-itens .custom-item.custom-item-child:visible').each(function(){
        var self = jQuery(this);
        if(!self.hasClass('custom-choosed') && !self.hasClass('custom-item-type-seletor-de-cor')){
            custom_item = '<li class="custom-item">';
            custom_item+= '<a class="custom-item-button">';
            custom_item+= '<span class="custom-item-title">' + self.text() + '</span>';
            custom_item+= '</a></li>';
            jQuery('#validation-custom-itens').append(custom_item);
        }
    });
}
function anchorToLink(hash){
  var root = jQuery( 'html, body' );
  root.animate({
    scrollTop: jQuery( hash ).offset().top
  }, 700);
}
function showStep(step){
    jQuery('.step').addClass('hidden').hide();
    jQuery('#step-' + step).fadeIn(500, function(){
        jQuery(this).removeClass('hidden');
    });
}
function showScenario(index){
    index = typeof index !== 'undefined' ? index : jQuery('#screen-1').data('cenario');
    jQuery('.scenario-bg').hide();
    if(is_lt_ie10()){
        jQuery('#scenario-bg-' + index).css('opacity', 1).show();
    }else{
        jQuery('#scenario-bg-' + index).fadeIn();
    }
    jQuery('.scenario-control').addClass('toggle-scenario-control');
}
function hideScenario(){
    jQuery('.scenario-bg').fadeOut();
    jQuery('.scenario-control').removeClass('toggle-scenario-control');
}
function fillAll(){
    jQuery('.custom-item-child:visible').each(function(i){
        var self = jQuery(this);
        if(!self.hasClass('custom-item-type-seletor-de-cor')){
            var field = self.find('.custom-item-button').data('field');
            var custom_field = jQuery('.custom-field.' + field);
            var value = custom_field.find('.bt-optional').length - 1;
            value = Math.floor(Math.random() * (value - 0 + 1)) + 0;
            custom_field.removeClass('custom-field-empty');
            custom_field.find('.bt-optional[data-value="' + value + '"]').addClass('optional-choosed').addClass('optional-choosed-remember');
            custom_field.find('.customizer-value').attr('value', value);
            jQuery('.custom-item.' + field).addClass('custom-choosed');
        }
    });
}
function fillCustomizer(){
    //fillAll();
    jQuery('.custom-field').each(function(){
        var self = jQuery(this);
        if(self.find('.pallet-color.pre-selected').length){
            self.find('.pallet-color.pre-selected').trigger('click');
            self.find('.bt-confirm').trigger('click');
        }
        if(self.find('.bt-optional.pre-selected').length){
            self.find('.bt-optional.pre-selected').trigger('click');
            self.find('.bt-confirm').trigger('click');
        }
    });
}
/* [/COMMON ELEMENTS ANIMATIONS]*/

function callStep(step){
    switch(step){
        case 2:
            simulationStep2();
        break;
        case 3:
            simulationStep3();
        break;
        case 4:
            simulationStep4();
            showSerieSpots();
        break;
        default:
            simulationStep1();
        break;
    }
}

/* [STEPS TRANSITIONS]*/
function simulationStep1(){
    jQuery('#screen-1').removeClass('viewing-step-1 viewing-step-2 viewing-step-3 viewing-step-4');
    jQuery('#screen-1').addClass('viewing-step-1').data('step', 1);
    showStep(1);
    jQuery('.step-back').data('action', 'close');
    jQuery('.step-progress').addClass('first-step');
    jQuery('.step-progress-container').show();
    jQuery('#screen-1 .main-content').show();
    window.scrollTo(0,0);
}
function simulationStep2(){
    jQuery('body').addClass('in-customizer');
    jQuery('#screen-1').removeClass('viewing-step-1 viewing-step-2 viewing-step-3 viewing-step-4');
    jQuery('#screen-1').addClass('viewing-step-2').data('step', 2);
    if(!jQuery('#current-user-container').hasClass('is-logged')){
        var username = jQuery('#step-1 .input-name').val();
        if(username == 'Seu nome'){
            username = '';
        }
        username = username.split(' ')[0];
        showStep(2);
        if(username) jQuery('#username').text(username);
        jQuery('#current-user-container').addClass('has-identity');
    }else{
        showStep(2);
    }
    jQuery('.step-back').data('action', 'step-1');
    jQuery('.step-progress').removeClass('first-step').addClass('second-step');
    jQuery('#step-2 .itens-serie-cadeira').show();
}

function simulationStep3(){
    jQuery('body').addClass('in-customizer');
    jQuery('#screen-1').removeClass('viewing-step-1 viewing-step-2 viewing-step-3 viewing-step-4');
    jQuery('#screen-1').addClass('viewing-step-3').data('step', 3);
    jQuery('.step-back').data('action', 'step-2');
    jQuery('.step-progress').removeClass('second-step')
    showStep(3);
}

function simulationStep4(){
    jQuery('body').addClass('in-customizer');
    jQuery('#screen-1').removeClass('viewing-step-1 viewing-step-2 viewing-step-3 viewing-step-4');
    jQuery('#screen-1').addClass('viewing-step-4').data('step', 4);
    jQuery('.step-back').data('action', 'close');
    customChairPositioning();
    showStep(4);
    jQuery('.step-progress-container').hide();
    jQuery('#screen-1 .main-content').hide();
    //jQuery('.overlayer').hide();
    //jQuery('.screen').removeClass('blur-container');
    hideOverlayer(true, function(){
        /*
        jQuery('#chair-preview').addClass('repositioned').animate({
            'margin-right' : '265px'
        }, 500, function(){
            showSerieSpots();
        });
        */
        //showSerieSpots();
        if(jQuery('#custom-sidebar').hasClass('sidebar-hidden')){
            showCustomizer();
        }
    });
    window.scrollTo(0,0);
    //Preenche automáticamente o customizador
    //fillCustomizer();
}
/* [/STEPS TRANSITIONS]*/

/* [CUSTOMIZER FUNCTIONS]*/
function customChairPositioning(){
    var windowWidth = document.documentElement.clientWidth || document.body.clientWidth;
    var fixed_top = windowWidth <= 1366 ? '35px' : '55px';
    var fixed_left = windowWidth <= 1366 ? '75px' : '110px';

    var chair = jQuery('#chair-preview img:visible');
    chair.parent().parent().addClass('normal');
    var pos = chair.offset();
    var size = {
        width : chair.css('width'),
        height : chair.css('height')
    }; 
    jQuery('#chair-preview').addClass('repos').css({
        left : fixed_left,
        top : fixed_top,
        width : size.width,
        height : size.height
    });
}
function normalChairPositioning(){
    jQuery('#chair-preview').removeClass('repos').removeAttr('style');
}
function showSerieSpots(){
    var windowWidth = document.documentElement.clientWidth || document.body.clientWidth;
    var fixed_top = windowWidth <= 1366 ? '35px' : '55px';
    var fixed_left = windowWidth <= 1366 ? '75px' : '110px';
    
    var chair = jQuery('#chair-preview img:visible');
    var pos = chair.offset();
    var size = {
        width : chair.css('width'),
        height : chair.css('height')
    }; 
    jQuery('#chair-spots').css({
        //top: fixed_top,
        //left : pos.left,
       // width : size.width,
       // height : size.height
    }).show().find('.spot').fadeIn();
}
/*
 * Checa se todos os dados foram preenchidos para a customização
 */
function isFormComplete(){
    var isComplete = false;
    var register_fields = jQuery('#step-1 .register-input:not(.customSelect)').length;
    var filled_fields = 0;
    jQuery('#step-1 .register-input').each(function(){
        if(jQuery(this).val() != ''){
            filled_fields++;
        }
    });
    return register_fields == filled_fields;
}
function isCustomComplete(){
    var isComplete = false;
    var custom_itens = jQuery('#custom-itens .custom-item.custom-item-child:visible').length - 1; //Exclude color choice
    var choosed_itens = jQuery('#custom-itens .custom-item.custom-item-child.custom-choosed:visible').length;
    return custom_itens == choosed_itens;
}
function showPartImage(part, callback){
    var _function = function(){};
    callback = typeof callback !== 'undefined' ? callback : _function;
    jQuery('#chair-preview').hide();
    jQuery('.spots-container').hide();
    jQuery('#over-images').hide();
    jQuery('#zoom-itens .zoom-image').hide();
    if(jQuery('.scenario-bg:visible').length){
        jQuery('.scenario-control').trigger('click').addClass('auto-toggle');
    }
    jQuery('#zoom-itens').show().find('#zoom-image-' + part).fadeIn(function(){
        callback();
    });
}
function hidePartImage(callback){
    var _function = function(){};
    callback = typeof callback !== 'undefined' ? callback : _function;
    jQuery('#zoom-itens .zoom-image').hide();
    jQuery('#zoom-itens').hide();
    jQuery('#zoom-itens .temp-image').hide().removeClass('temp-image');
    jQuery('#zoom-itens .current-image').show();
    if(jQuery('.scenario-control').hasClass('auto-toggle')){
        jQuery('.scenario-control').trigger('click').removeClass('auto-toggle');
    }
    jQuery('.over-image.temp-hide').removeClass('temp-hide');
    jQuery('#chair-preview').fadeIn(function(){
        //jQuery('#over-images').fadeIn();
        jQuery('.spots-container').fadeIn(function(){
            callback();
        });
    });
}
function showOverImage(part, value, field){
    var field_id = parseInt(field.replace('field_', ''));
    var over_image = jQuery('.over-image-' + field + '.over-image-' + part + '_' + value);
    var dependency = jQuery('.custom-item.dependency-' + field_id).data('field');
    jQuery('.over-image-' + field).hide().removeClass('temp-image');
    jQuery('.over-image-field_' + dependency).addClass('temp-hide');
    over_image.addClass('temp-image').show();
}
function confirmOverImage(field){
    jQuery('.over-image-' + field).removeClass('current-image');
    jQuery('.over-image-' + field + '.temp-image').removeClass('temp-image').addClass('current-image');
}
/* [/CUSTOMIZER FUNCTIONS]*/

/* [ON EVENTS FUNCTIONS]*/
function mirrorInputs(self){
    var css_class = self.val() == '' ? '' : 'filled';
    var selector = self.hasClass('default-input') ? '.alt-input' : '.default-input';
    jQuery('.register-input[name="' + self.attr('name') + '"]' + selector).val(self.val()).removeClass('filled').addClass(css_class);
    if(self.hasClass('gfield_select')){
        var text = self.parent().find('.customSelectInner').text();
        var select = jQuery('.customSelect.input-' + self.attr('name') + selector);
        select.find('.customSelectInner').text(text);
        if(self.val() == ''){
            select.removeClass('filled');
        }else{
            select.addClass('filled');
        }
    }
}
/*
 * Quando o usuário clica em um botão de configuração
 */
function onCustomItemButtonClicked(field, field_type, part){
    field = typeof field !== 'undefined' ? field : '';
    field_type = typeof field_type !== 'undefined' ? field_type : '';
    part = typeof part !== 'undefined' ? part : '';
    //console.log(part);
    switch(field_type){
        case 'seletor-de-cor':
            jQuery('.pallet-color').removeClass('current');
            jQuery('.pallet-color input:checked').parent().parent().addClass('current');
        break;
        default:
        break;
    }
    var scroll_position = parseInt(jQuery('#custom-sidebar .mCSB_container').css('top').replace('px', ''));
    jQuery('#custom-itens').data('scroll-position', scroll_position);

    //Mostra ampliação se existir
    var zoom_image = jQuery('#zoom-image-' + part);
    if(zoom_image.find('.over-image-' + field).length){
        showPartImage(part);
    }
}
/*
 * Quando o usuário troca a série da cadeira dentro do configurador
 */
function onSerieChange(serie){
    callCustomizer(serie);
    jQuery('#series-choices-container').removeClass('active');
}
/*
 * Quando o usuário abre o site ou redimensiona a tela
 */
function onScreenResize(){
    onScreenResize_SetScreenHeight();
    elementsRepositioning();
}
function onScreenResize_SetSliderContentOnMiddle(){
    jQuery('.slides-container .container').each(function(){
        var self = jQuery(this);
        var containerHeight = parseInt(self.css('height').replace('px', '')) + 30;
        self.css({
            'top' : '50%',
            'margin-top' : '-' + (containerHeight / 2) + 'px'
        });
    });    
}
function onScreenResize_SetScreenHeight(){
    var windowWidth = document.documentElement.clientWidth || document.body.clientWidth;
    var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
    jQuery('.screen:not(.scroll)').css('height', windowHeight + 'px');
}

function chairPreviewCorrection(){
     if(jQuery('#chair-preview').hasClass('repos')){
        customChairPositioning();
        showSerieSpots();
        //if(jQuery('body').hasClass('viewing-360')){
        //    jQuery(document).trigger('doMake360');    
        //}
     }
}

function elementsRepositioning(){
    var windowWidth = document.documentElement.clientWidth || document.body.clientWidth;
    var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;

    var new_width = 0;
    var new_height = 0;
    var perc_reduct = 30;

    //Imagens da cadeira
    jQuery('.aqia-chair:not(.default-chair)').each(function(){
        var self = jQuery(this);
        var new_width = self.find('img:first').attr('width');
        new_width = new_width - (new_width / 100) * perc_reduct;
        
        var new_height = self.find('img:first').attr('height');
        new_height = new_height - (new_height / 100) * perc_reduct;

        if(windowWidth <= 1366){
            self.find('img:first').css({
                width : new_width + 'px',
                height : new_height + 'px',
            });
        }else{
            self.find('img:first').removeAttr('style');
        }
    });

    //over-images
    jQuery('.over-image').each(function(){
        var self = jQuery(this);
        var new_width = self.find('img:first').attr('width');
        new_width = new_width - (new_width / 100) * perc_reduct;
        
        var new_height = self.find('img:first').attr('height');
        new_height = new_height - (new_height / 100) * perc_reduct;

        if(windowWidth <= 1366){
            var new_top = self.data('top');
            new_top = new_top - (new_top / 100) * perc_reduct;

            var new_left = self.data('left');
            new_left = new_left - (new_left / 100) * perc_reduct;

            self.css({
                top : new_top + 'px',
                left : new_left + 'px',
            });

            self.find('img:first').css({
                width : new_width + 'px',
                height : new_height + 'px',
            });
        }else{
            self.find('img:first').removeAttr('style');
            self.css({
                top : self.data('top') + 'px',
                left : self.data('left') + 'px',
            });            
        }
    });
    
    //zoom-images
    jQuery('.zoom-image').each(function(){
        var self = jQuery(this);
        var new_width = self.find('img:first').attr('width');
        new_width = new_width - (new_width / 100) * perc_reduct;
        
        var new_height = self.find('img:first').attr('height');
        new_height = new_height - (new_height / 100) * perc_reduct;

        var new_margin_top = self.data('margin-top');

        if(windowWidth <= 1366){
            new_margin_top = new_margin_top - (new_margin_top / 100) * perc_reduct;
            self.css('margin-top', '-' + new_margin_top + 'px');
            self.find('img:first').css({
                width : new_width + 'px',
                height : new_height + 'px',
            });
        }else{
            self.find('img:first').removeAttr('style');
            self.css('margin-top', '-' + new_margin_top + 'px');
        }
    });

    //over-images
    jQuery('.spot').each(function(){
        var self = jQuery(this);

        var new_top = self.data('top');
        var new_left = self.data('left');

        if(windowWidth <= 1366){
            
            new_top = new_top - (new_top / 100) * perc_reduct;    
            new_left = new_left - (new_left / 100) * perc_reduct;

            self.css({
                top : new_top + 'px',
                left : new_left + 'px',
            });

        }else{
            self.css({
                top : new_top + 'px',
                left : new_left + 'px',
            });            
        }
    });

}

/*
 * Confirmação de campo opcional
 */
function onConfirmOptional(field_id){

}

/*
 * Verifica se um campo pode ser desmarcado
 */

function unmark(jqobj_optional){
    var unmark = jqobj_optional.data('unmark');
    var unmark_itens = null;
    var is_unmarkable = false;
    if(unmark != ''){
        if(typeof unmark == 'number'){
            unmark_itens = [unmark];
        }else{
            unmark_itens = unmark.split('|');
        }
        for(i = 0; i < unmark_itens.length; i++){
            if(jQuery('.custom-field.field_' + unmark_itens[i]).hasClass('custom-field-required-choice')){
                var reqs = jQuery('.custom-field.field_' + unmark_itens[i] + ' .bt-optional.optional-choosed').data('required');
                var reqs_itens = null;
                if(reqs != '' && reqs != undefined){
                    if(typeof reqs == 'number'){
                        reqs_itens = [reqs];
                    }else{
                        reqs_itens = reqs.split('|');
                    }
                    for(j = 0; j < reqs_itens.length; j++){
                        if(unmark_itens.indexOf(reqs_itens[j]) != -1){
                            is_unmarkable = true;
                        }
                    }
                }
            }else{
                is_unmarkable = true;
            }
            if(is_unmarkable){
                resetConfig(parseInt(unmark_itens[i]));
            }
            is_unmarkable = false;
        }
    }
}

/*
 * Reseta a scrollbar até o topo
 */
function resetConfigScroll(){
     jQuery('#custom-sidebar .scrollable').mCustomScrollbar('scrollTo', 0, { scrollInertia : 500});
}

/*
 * Reseta uma congiguração
 */
function resetConfig(field){
    if(typeof field == 'number') field = 'field_' + field;
    var custom_field = jQuery('.custom-field.' + field);
    if(custom_field.hasClass('seletor-de-cor')){
        var bg = 'url(' + custom_field.find('.pallet-color:first').data('src') + ')';
        var color_name = custom_field.find('input:first').data('label');
        custom_field.find('.pallet-color').removeClass('current').find('input').attr('checked', false);
        custom_field.find('.pallet-color:first').addClass('current');
        custom_field.find('input:first').attr('checked', true);
        jQuery('.custom-item.' + field).find('.custom-choosed-color .thumbnail').css('background-image', bg);
        jQuery('#custom_item_' + field + ' .custom-item-choosed-text').text(color_name);
    }else{
        custom_field.addClass('custom-field-empty');
        custom_field.find('.customizer-value').attr('value', "");
        custom_field.find('.bt-optional').removeClass('optional-choosed-temp').removeClass('optional-choosed').removeClass('optional-choosed-remember');
        jQuery('.custom-item.' + field).removeClass('custom-choosed');
        jQuery('#custom_item_' + field + ' .custom-item-choosed-text').text('');
    }
    jQuery('.over-image-' + field).removeClass('current-image').removeClass('temp-image').hide();
    jQuery('.custom-item.dependency-item.' + field).hide();
 }
/* [/ON EVENTS FUNCTIONS]*/

/* [AJAX FUNCTIONS]*/
/*
function generatePDF(){
    var custom_data = new Array();
    jQuery.ajax({
        type: 'post',
        url: AQIAData.ajaxurl, 
        data: {
            '_ajax_nonce': AQIAData.nonce, 
            'action': 'aqia_generate_pdf',
            'custom_data' : custom_data
        },
        success : function(url){
            window.open(url)
        }
    });
}
*/
function finishCustomization(){
    showOverlayer(function(){
        jQuery('#over-images').hide();
        jQuery('.finish-loader').show();
    }, true);
    jQuery.ajax({
        type: 'post',
        url: AQIAData.ajaxurl, 
        data: {
            '_ajax_nonce': AQIAData.nonce, 
            'action': 'aqia_finish_customization',
            'serie' : jQuery('.serie-dropdown-item').data('aqia'),
            'form' : jQuery('#form-result form').serialize(),
            'customization' : jQuery('#user-customization').serialize()
        },
        success : function(html){
            jQuery('.finish-loader').hide('fast');
            //jQuery('#over-images').fadeIn();
            hideOverlayer(true, function(){
                jQuery('#custom-options').hide();
                jQuery('#custom-others .scenario-control').hide();
                jQuery('#custom-others .customizer-result').html(html).show();   
                jQuery('#custom-itens').addClass('no-edit');
                jQuery('.spots-container').hide();
            });
        }
    });
}
function callCustomizer(aqia_id){
    jQuery('#chair-preview .aqia-chair').hide();
    jQuery('#chair-preview .aqia-chair-' + aqia_id).show();
    if(jQuery('#custom-itens').data('serie') != aqia_id || jQuery('#custom-itens').hasClass('no-edit')){
        jQuery('#custom-itens').removeClass('no-edit');
        jQuery('#customization-images .loads').html('');
        jQuery('.customizer-loader').show();
        jQuery.ajax({
            type: 'post',
            url: AQIAData.ajaxurl, 
            dataType : 'json',
            data: {
                '_ajax_nonce': AQIAData.nonce, 
                'action': 'aqia_call_customizer',
                'serie' : aqia_id
            },
            success : function(customizer){
                jQuery('#custom-itens').data('serie', aqia_id).html(customizer.settings);
                jQuery('#user-customization').html(customizer.panels);
                jQuery('#customization-images .loads').html(customizer.spots);
                showSerieSpots();
                jQuery('.customizer-loader').fadeOut();
                if(jQuery('.customizer-result').is(':visible')){
                    jQuery('.customizer-result').html('').hide();
                    jQuery('#custom-options').show();
                    jQuery('#custom-others .scenario-control').show();
                }
                elementsRepositioning();
                fillCustomizer();
            }
        });
    }
}
/* [/AJAX FUNCTIONS]*/

/* [JQUERY PLUGIN FUNCTIONS]*/
jQuery.fn.toTop = function(){
	jQuery(this).click(function(){
		jQuery("html, body").animate({scrollTop:0}, 500);
	});
};
/* [/JQUERY PLUGIN FUNCTIONS]*/

/* [OBJECTS]*/
var BrowserDetect = {
  init: function(){
    this.browser = this.searchString(this.dataBrowser) || "Other";
    this.version = this.searchVersion(navigator.userAgent) ||       this.searchVersion(navigator.appVersion) || "Unknown";
  },
  searchString: function(data){
    for(var i=0 ; i < data.length ; i++){
      var dataString = data[i].string;
      this.versionSearchString = data[i].subString;

      if(dataString.indexOf(data[i].subString) != -1){
        return data[i].identity;
      }
    }
  },
  searchVersion: function(dataString){
    var index = dataString.indexOf(this.versionSearchString);
    if (index == -1) return;
    return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
  },
  dataBrowser: [
    { string: navigator.userAgent, subString: "Chrome",  identity: "Chrome" },
    { string: navigator.userAgent, subString: "MSIE",    identity: "Explorer" },
    { string: navigator.userAgent, subString: "Firefox", identity: "Firefox" },
    { string: navigator.userAgent, subString: "Safari",  identity: "Safari" },
    { string: navigator.userAgent, subString: "Opera",   identity: "Opera" }
  ]
};
function is_ie8(){
    return BrowserDetect.browser == 'Explorer' && BrowserDetect.version < 9;
}
function is_lt_ie10(){
    return BrowserDetect.browser == 'Explorer' && BrowserDetect.version <= 9;
}
/* [/OBJECTS]*/

function make360(frames, width, height, path){
    var windowWidth = document.documentElement.clientWidth || document.body.clientWidth;
    var perc_reduct = 30;
    var new_width = width - (width / 100) * perc_reduct;
    width = windowWidth <= 1366 ? new_width : width;

    //var t60 = null;

    //jQuery('.t60-container').removeAttr('style');
    //jQuery('.t60-container .spinner').text('0%');
    //jQuery('.t60-container .threesixty_images').removeAttr('style');
    jQuery('.t60-container .threesixty_images li').remove();

    setTimeout(function(){
        jQuery('.t60-container').ThreeSixty({
            totalFrames : frames,
            endFrame: frames, // end frame for the auto spin animation
            currentFrame: 1, // This the start frame for auto spin
            imgList: '.threesixty_images', // selector for image list
            progress: '.spinner', // selector to show the loading progress
            imagePath:path, // path of the image assets
            filePrefix: '', // file prefix if any
            ext: '.png', // extention for the assets
            height: height,
            width: width,
            navigation: false
        });
    }, 500);
    
}
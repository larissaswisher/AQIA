/* [PASSO A PASSO CONFIGURADOR ]*/
jQuery(document).on('click', '.social-share .social.email', function(){
    showShareWindow();
});

jQuery(document).on('click', '#menu-button', function(){
    jQuery('.header-links').slideToggle('fast')
    jQuery(this).toggleClass('active');
});

jQuery(document).on('click', '.caracteristics-button', function(event){
    event.preventDefault();
    jQuery('html, body').animate({
        scrollTop: jQuery('#screen-2').offset().top
    }, 700);
});

jQuery(document).on('click', '.menu-links a', function(event){
    event.preventDefault();
    var self = jQuery(this);
    var is_customizer = self.attr('href') == '#customize-yours';
    var selector = is_customizer ? '#screen-1' : self.attr('href');
    //var selector = self.attr('href');
    if(self.hasClass('header-link')){
        if(jQuery('body').hasClass('in-customizer')){
            if(is_customizer){
                return;
            }else{
                jQuery('body').addClass('outed');
                jQuery('#the-custom-button').data('step', jQuery('#screen-1').data('step'));
                jQuery('#the-custom-button').data('aqia', jQuery('.aqia-chair:visible').data('aqia'));
                jQuery('#the-custom-button').data('cenario', jQuery('.scenario-bg:visible').data('cenario'));
                jQuery('.step-back').data('action', 'close').trigger('click');
            }
        }
        jQuery('.header-links').hide();
        jQuery('#menu-button').removeClass('active');
    }
    jQuery('html, body').animate({
        scrollTop: jQuery(selector).offset().top
    }, 700, function(){
        if(is_customizer){
            jQuery('#screen-1 .square-button.customization').trigger('click');
        }
    });
});
/*
 * Label: "Customização"
 * Location: #screen-1
 * Description: Inicia o passo a passo do Customizador
 */
jQuery(document).on('click', '#the-custom-button', function(){
    var self = jQuery(this);
    if(self.hasClass('customization')){
        jQuery('body').addClass('in-customizer');
        showOverlayer();
        jQuery('.aqia-chair-' + self.data('aqia')).show();
        showScenario(self.data('cenario'));
        callStep(self.data('step'));
        jQuery('#customization-forms').show();
    }
});

/*
 * Label: "Voltar"
 * Location: #customization-forms
 * Description: Volta telas do passo a passo ou se estiver no customizador, fecha o customizador
 */
jQuery(document).on('click', '.step-back', function(){
    var self = jQuery(this);
    if(self.data('action') == 'close'){
        showOverlayer();
        if(jQuery('#zoom-itens').is(':visible')){
            hidePartImage();
        }
        jQuery('#chair-spots').hide().find('.spot').hide();
        jQuery('#chair-preview .aqia-chair').hide();
        normalChairPositioning();
        jQuery('#chair-preview .aqia-chair.default-chair').fadeIn('slow');
        /*
        jQuery('#chair-preview.repositioned').animate({
            'margin-right' : 0
        }, 500);
        */
        jQuery('body').removeClass('in-customizer');
        if(!jQuery('body').hasClass('outed')){
            jQuery('#the-custom-button').data('step', 1);
            jQuery('#the-custom-button').data('aqia', 0);
            jQuery('#the-custom-button').data('cenario', 0);
        }
        jQuery('body').removeClass('outed');
        //hideOverlayer();
        if(jQuery('.customizer-result').is(':visible')){
            jQuery('.customizer-result').html('').hide();
            jQuery('#custom-options').show();
            jQuery('#custom-others .scenario-control').show();
        }
        jQuery('.scenario-bg:visible').fadeOut();
        jQuery('html, body').removeClass('no-scroll');
        jQuery('#customization-forms').fadeOut(function(){
            jQuery('#screen-1').removeClass('viewing-step-1 viewing-step-2 viewing-step-3 viewing-step-4');
            jQuery('#screen-1').addClass('viewing-step-1');
        	simulationStep1();
            jQuery( '#the-custom-button' ).trigger( 'click' ); 
        });
    } 
    if(self.data('action') == 'step-1'){
        simulationStep1();
    }
    if(self.data('action') == 'step-2'){
        simulationStep2();
    }
    if(self.data('action') == 'close-validation'){
        jQuery('#validation-result').hide();
        hideOverlayer(true, function(){
            jQuery('#custom-top').fadeIn();
            jQuery('#custom-bottom').fadeIn();
            jQuery('#chair-container').fadeIn();
            //jQuery('#over-images').fadeIn();
        });
        showCustomizer();
        self.data('action', 'close');    
    }
    if(self.data('action') == 'close-itens-serie'){
        jQuery('.bt-close-itens-serie').trigger('click');
        self.data('action', 'close');
    }
    if(self.data('action') == 'close-360'){
        jQuery('.bt-360').trigger('click');
        self.data('action', 'close');
    }
    if(self.data('action') == 'close-info-window'){
        jQuery('#spot-windows').hide();
        hideOverlayer(true, function(){
            jQuery('#custom-top').fadeIn();
            jQuery('#custom-bottom').fadeIn();
        });
        showCustomizer();
        self.data('action', 'close');    
    }
    if(self.data('action') == 'close-system-messages'){
        jQuery('#system-messages').hide();
        hideOverlayer(true, function(){
            jQuery('#custom-top').fadeIn();
            jQuery('#custom-bottom').fadeIn();
            jQuery('#over-images').fadeIn('fast');
        });
        showCustomizer();
        self.data('action', 'close');    
        jQuery('#share-mail .share-completed').hide();
        jQuery('#share-mail .form-clousure').show();
    }
});

jQuery(document).on('click', '.bt-close-form-validation', function(){
    jQuery('.form-validation-result').hide();
    jQuery('.form-validation-result .validated-fields').html('');
    jQuery('.form-clousure').show();
});

jQuery(document).on('click', '.bt-close-share', function(){
    jQuery('.step-back').trigger('click');
});

/*
 * Label: "Continuar ou Preencher Depois"
 * Location: #step-1 .aqia-form
 * Description: Vai para a etapa de seleção de cenário
 */
jQuery(document).on('click', '.bt-step1-continue', function(){
    var self = jQuery(this);
    if(self.hasClass('validate-step')){
        var which = self.hasClass('default-input') ? 'default-input' : 'alt-input';
        if(validateFields(which)){
            simulationStep2();    
        }
    }else{
        simulationStep2();
    }
});

/*
 * Label: "Selecionar"
 * Location: #step-2 .choice-cadeira
 * Description: Vai para o configurador
 */
jQuery(document).on('click', '.bt-choice-serie', function(){
   simulationStep3(); 
   var self = jQuery(this);
   jQuery('.serie-dropdown-item').data('aqia', self.data('cadeira')).text(self.data('serie'));
   jQuery('.bt-choice-serie').removeClass('current');
   self.addClass('current');
   //callCustomizer(self.data('cadeira'));
});

/*
 * Label: "image"
 * Location: #step-2 .choice-cadeira
 * Description: Trigger do botão de escolha de cadeira quando clica na imagem
 */
jQuery(document).on('click', '.choice-cadeira-link', function(){
	jQuery('#' + jQuery(this).data('rel')).trigger('click');
});

/*
 * Label: "Selecionar"
 * Location: #step-3 .scenario-choice
 * Description: Vai para a etapa de escolha de cadeira
 */
jQuery(document).on('click', '.bt-choice-cenario', function(){
	var self = jQuery(this);
    var cenario = self.data('cenario');
    callCustomizer(jQuery('.bt-choice-serie.current').data('cadeira'));
	jQuery('#screen-1').data('cenario', cenario);
    jQuery('.aqia-form input[name="escritorio"]').val(cenario);
   	simulationStep4(); 
    jQuery('.cenarios-dropup-list-item-' + cenario).show().addClass('cenarios-dropup-list-item-visible');
   	showScenario(cenario);
});
/*
 * Label: "image"
 * Location: #step-3 .scenario-cadeira
 * Description: Trigger do botão de escolha de cenário quando clica na imagem
 */
jQuery(document).on('click', '.scenario-choice-link', function(){
	jQuery('#' + jQuery(this).data('rel')).trigger('click');
});
/*
 * Label: "Limpar escolhar"
 * Location: #custom-others
 * Description: Reseta as configurações para seus estados padrão
 */
jQuery(document).on('click', '#bt-reset-choices', function(){
    //if(confirm('Confirma limpar escolhas?')){
        confirmWindow('msg_reset_choices', function(){
             jQuery('#custom-itens .custom-item-child').each(function(){
                var field = jQuery(this).find('.custom-item-button').data('field');
                resetConfig(field);
                resetConfigScroll();
            });
            fillCustomizer();
        });
    //}
});
/*
 * Label: "ITENS DE SÉRIE - Saiba mais"
 * Location: #custom-top
 * Description: Abre a janela com os itens de série da cadeira escolhida
 */
jQuery(document).on('click', '.itens-serie', function(){
    hideCustomizer(function(){
        jQuery('#over-images').hide();
        jQuery('#custom-bottom').fadeOut();
        showOverlayer();
        jQuery('.itens-serie').hide();
        jQuery('.itens-serie-cadeira-' + jQuery('.serie-dropdown-item').text()).fadeIn('fast');
        if(jQuery('#custom-sidebar .tab').hasClass('back')){
        	jQuery('#custom-sidebar .tab').removeClass('back');
        	jQuery('.bt-close-itens-serie').addClass('onCloseSidebarTabBackState');
        }
        jQuery('.step-back').data('action', 'close-itens-serie');
    });
});

/*
 * Label: "Fechar"
 * Location: #itens-serie-cadeiras
 * Description: Fecha a janela com os itens de série da cadeira escolhida
 */
jQuery(document).on('click', '.bt-close-itens-serie, .itens-serie-cadeira .tab.back', function(){
    jQuery('#itens-serie-cadeiras .itens-serie-cadeira').hide();
    hideOverlayer(true);
    if(jQuery('.bt-close-itens-serie').hasClass('onCloseSidebarTabBackState')){
    	jQuery('#custom-sidebar .tab').addClass('back');
    }
    showCustomizer();
    jQuery('.itens-serie').show();
    //jQuery('#over-images').fadeIn();
    jQuery('#custom-bottom').fadeIn();
});
/* [/PASSO A PASSO CONFIGURADOR ]*/


/* [SELETOR DE SÉRIE DO CONFIGURADOR]*/
/*
 * Label: "S ou T"
 * Location: #series-choices-container
 * Description: Permite selecionar a série da cadeira no configurador
 */
jQuery(document).on('click', '.serie-dropdown-item', function(){
    jQuery('.serie-choices').slideToggle(500);
    jQuery(this).parent().toggleClass('active');
});

/*
 * Label: "S ou T"
 * Location: #series-choices-container
 * Description: Evento ao mudar de série dentro do configurador
 */
jQuery(document).on('click', '.serie-choice a', function(){
    var self = jQuery(this);
    var current_aqia =  jQuery('.serie-dropdown-item').data('aqia');
    var new_aqia = self.data('aqia');
    if(current_aqia != new_aqia){
        //if(confirm('Você perderá as configurações do seu orçamento. Deseja continuar?')){
        confirmWindow('msg_serie_change', function(){
            jQuery('.serie-dropdown-item').data('aqia', self.data('aqia')).text(self.text());
            onSerieChange(new_aqia);
        });
        jQuery('#series-choices-container').removeClass('active');
        //}
    }
    jQuery('.serie-choices').hide();

});
/* [/SELETOR DE SÉRIE DO CONFIGURADOR]*/

/* [OPÇÕES DA SIDEBAR]*/
/*
 * Label: "360°"
 * Location: #custom-sidebar
 * Description: Inicia ou fecha a visualização 360°
 */
jQuery(document).on('click', '.bt-360', function(){
    if(jQuery('body').hasClass('viewing-360')){
        if(jQuery('.scenario-control').hasClass('auto-toggle')){
            jQuery('.scenario-control').trigger('click').removeClass('auto-toggle');
        }
        jQuery('.end-360').fadeOut('fast', function(){
            jQuery('.t60-container').hide();
            jQuery('.aqia-chair.last-visible').removeClass('last-visible').fadeIn('fast');
            showCustomizer(function(){
                jQuery('body').removeClass('viewing-360');  
                jQuery('.step-back').data('action', 'close');      
                jQuery('#custom-top').fadeIn();
                jQuery('#custom-bottom').fadeIn();
                //jQuery('#over-images').fadeIn();
                jQuery('.spots-container').fadeIn();
                //jQuery('.t60-container .threesixty_images li').remove();
            });
        });
        
    }else{
        if(jQuery('.scenario-bg:visible').length){
            jQuery('.scenario-control').trigger('click').addClass('auto-toggle');
        }
        hideCustomizer(function(){
            jQuery('.aqia-chair:visible').addClass('last-visible');
            jQuery('#over-images').hide();
            jQuery('.spots-container').hide();
            jQuery('#custom-top').fadeOut();
            jQuery('#custom-bottom').fadeOut();
            jQuery('.end-360').fadeIn();
            jQuery('body').addClass('viewing-360');
            jQuery('.step-back').data('action', 'close-360');      
            jQuery('.aqia-chair').hide();
            jQuery('.t60-container').fadeIn(function(){
                /*
                if(!jQuery(this).hasClass('already-active')){
                    jQuery(document).trigger('doMake360');     
                    jQuery(this).addClass('already-active')
                }
                */
                 jQuery(document).trigger('doMake360');     
            });
        });
    }
});
/*
 * Label: "Ativar fundo ou Desativar fundo"
 * Location: #custom-others
 * Description: Ativa/desativa o cenário
 */
jQuery(document).on('click', '.scenario-control', function(){
	var self = jQuery(this);
	//Se possui esta classe ele esta ativo
	if(self.hasClass('toggle-scenario-control')){
		hideScenario();
	}else{	
		showScenario();
	}
});

jQuery(document).on('click', '.bt-form-back-customizer', function(){
    jQuery('.step-back').trigger('click');
});

/*
 * Label: "Finalizar customização"
 * Location: #custom-others
 * Description: Mostra os campos para serem preenchidos ou finaliza a customização
 */
jQuery(document).on('click', '#bt-end-customization', function(){
    //var is_custom_complete = isCustomComplete();
    var is_custom_complete = true;
    var is_form_complete = isFormComplete();
    if(is_custom_complete && is_form_complete){
        finishCustomization();
    }else{
        jQuery('#custom-top').fadeOut();
        jQuery('#custom-bottom').fadeOut();
        jQuery('#chair-container').hide();
        hideCustomizer(function(){
            showOverlayer(function(){
                jQuery('#over-images').hide();
                jQuery('#validation-result').find('.column').show();
                jQuery('#validation-result').removeClass('validate-both').removeClass('validate-single').removeClass('validate-form').removeClass('validate-customizer');
                jQuery('#form-result').removeClass('registration-ok');
                if(!is_custom_complete && !is_form_complete){
                    jQuery('#validation-result').addClass('validate-both');
                }else{
                    jQuery('#validation-result').addClass('validate-single');
                    if(!is_custom_complete){
                        jQuery('#form-result').hide();
                        jQuery('#validation-result').addClass('validate-customizer');
                    }
                    if(!is_form_complete){
                        jQuery('#custom-itens-result').hide();
                        jQuery('#validation-result').addClass('validate-form');
                    }
                }
                customizerCopyEmptyValues();
                jQuery('#validation-result').show();
            });
            jQuery('.step-back').data('action', 'close-validation');
        });
    }
});
/* [/OPÇÕES DA SIDEBAR]*/


/* [CONFIGURADOR] */
/*
 * Label: "???"
 * Location: #custom-itens
 * Description: Mostra as opções de um item do configurador
 */
jQuery(document).on('click', '.custom-item-button', function(){
    var self = jQuery(this);
    if(jQuery('#custom-itens').hasClass('no-edit')){
        return;
    }
    if(self.hasClass('show-custom-field-options')){
        jQuery('#custom-sidebar .toggle-content').hide();
        jQuery('#custom-fields-options .custom-field').hide();
        jQuery('#custom-fields-options').find('.custom-field.' + self.data('field')).show();
        jQuery('#custom-fields-options').fadeIn('fast');
        jQuery('.tab').addClass('back');
    }
    onCustomItemButtonClicked(self.data('field'), self.data('field-type'), self.data('part'));
});

/*
 * Label: "tab.png"
 * Location: #custom-sidebar
 * Description: Ativa algum evento ao clicar na tab, dependendo da classe atribuída a ele
 */
jQuery(document).on('click', '#custom-sidebar .tab', function(){
    var self = jQuery(this);
    if(self.hasClass('back')){
        var current_custom_field = jQuery('#custom-fields-options .custom-field:visible');

        //Volta imagens sobrepostas ao estado correto
        var field = current_custom_field.find('.bt-confirm').data('field');
        jQuery('#over-images').find('.temp-image').removeClass('temp-image').hide();
        jQuery('#over-images').find('.current-image').show();

        //Opcionais não confirmados voltam ao seu estado padrão
        jQuery('.bt-optional').removeClass('optional-choosed-temp');
        jQuery('.bt-optional.optional-choosed-remember').addClass('optional-choosed');
         if(!current_custom_field.find('.bt-optional.optional-choosed').length && current_custom_field.hasClass('custom-field-can-be-empty')){
            current_custom_field.addClass('custom-field-empty');
        }

        //Lembrar instrução da escolha única
        current_custom_field.find('.custom-field-optional-instructions').removeClass('show');
        current_custom_field.find('.custom-field-optional-instructions.choosed').addClass('show');

        current_custom_field.hide();
        jQuery('#custom-fields-options').hide();
        jQuery('#custom-sidebar .tab').removeClass('back');   
        jQuery('#custom-sidebar .toggle-content').fadeIn(); 

        var offset = jQuery('#custom-itens').data('scroll-position');
        jQuery('#custom-sidebar .scrollable').mCustomScrollbar('scrollTo', offset, { scrollInertia : 0});

        hidePartImage();
    }else{
        if(jQuery('#custom-sidebar').hasClass('sidebar-hidden') && !jQuery('#custom-sidebar').hasClass('sidebar-just-hidden')){
            jQuery('.step-back').trigger('click');
        }else{
            if(jQuery('#custom-sidebar').hasClass('sidebar-hidden')){
                showCustomizer(function(){
                    jQuery('#custom-sidebar').removeClass('sidebar-just-hidden');
                    jQuery('.spots-container').fadeIn();
                });
            }else{
                hideCustomizer(function(){
                    jQuery('#custom-sidebar').addClass('sidebar-just-hidden');
                    jQuery('.spots-container').fadeOut();
                });
            }
        }
        
        
    }
});

/*
 * Label: "an color image"
 * Location: #custom-fields-options
 * Description: Permite selecionar a cor da cadeira
 */
jQuery(document).on('click', '.pallet-color', function(){
    var self = jQuery(this);
    jQuery('.pallet-color').removeClass('current');
    self.addClass('current');
    jQuery('.custom-field.seletor-de-cor .custom-field-instructions').html(self.find('.color-instructions').html());

    //Muda a imagem sobreposta
    var field = self.data('field');
    var part = jQuery('#custom_item_' + field + ' .custom-item-button').data('part');
    var value = self.find('.customizer-value').val();

    showOverImage(part, value, field);

});
/*
 * Label: "Confirmar Escolha"
 * Location: #custom-fields-options
 * Description: Confirma a escolha da cor da cadeira
 */
jQuery(document).on('click', '.bt-confirm', function(){
    var self = jQuery(this);
    var field = self.data('field');
    var optional_prev_choosed = jQuery('.custom-field.' + field).find('.optional-choosed-remember');
    var part = jQuery('#custom_item_' + field + ' .custom-item-button').data('part');

    if(self.hasClass('bt-pallet-color-confirm')){
    	var color =  jQuery('.pallet-color.current');
        var input = color.find('input');
        jQuery('#custom_item_' + field + ' .custom-item-choosed-text').text(input.data('label'));
    	jQuery('.custom-choosed-color .thumbnail').css('background-image', 'url(' + color.data('src') + ')');
    	jQuery('.pallet-color input').attr('checked', false);
    	input.attr('checked', true);
    }
    if(self.hasClass('bt-confirm-optional')){
        var value = '';
        jQuery('.custom-field.' + field).find('.bt-optional').removeClass('optional-choosed-remember');
        jQuery('.custom-field.' + field).find('.optional-choosed-temp').addClass('optional-choosed').addClass('optional-choosed-remember').removeClass('.optional-choosed-temp');
        
        jQuery('.custom-field.' + field).find('.optional-choosed').each(function(){
            value+= jQuery(this).data('value') + '|'; 
        });
        value = value.substring(0, value.length - 1);
        
        jQuery('.customizer-value[name="' + field + '"]').attr('value', value);
        jQuery('.custom-item.' + field).addClass('custom-choosed');
        var label_name = jQuery('.custom-field.' + field).find('.optional-choosed').data('label');
        jQuery('#custom_item_' + field + ' .custom-item-choosed-text').html(label_name);

        //Lembra qual caixa de instruções deve permanecer
        jQuery('.custom-field.' + field).find('.custom-field-optional-instructions').removeClass('choosed');
        jQuery('.custom-field.' + field).find('.custom-field-optional-instructions.show').addClass('choosed');

        //Procura se este item tem acessórios para escolher
        var field_id = parseInt(field.replace('field_', ''));
        var field_name = jQuery('.custom-field.' + field).find('.optional-choosed').data('name');
        var dependency_field = jQuery('.custom-item.dependency-' + field_id).find('.custom-item-button').data('field');
        resetConfig(dependency_field);
        if(jQuery('.custom-field.dependency-' + field_id).find('.acessories-for-' + field_name).length){
            jQuery('.custom-item.dependency-' + field_id).show();
            jQuery('.custom-field.dependency-' + field_id).find('.acessories-container').hide();
            jQuery('.custom-field.dependency-' + field_id).find('.acessories-for-' + field_name).show();
        }else{
            jQuery('.custom-item.dependency-' + field_id).hide();
            jQuery('.custom-field.dependency-' + field_id).find('.acessories-container').hide();
        }

        //Verifica se existem e se é necessário desativar algum item ao selecionar NÃO para opcionais
        var optional_choosed = jQuery('.custom-field.' + field).find('.optional-choosed');
        if(optional_choosed.hasClass('bt-optional-opcional')){
            unmark(optional_choosed);
        }

        //Exceção criada para o micromotor
        /*
        var odd_micromotor = jQuery( '#user-customization').find( '.optional-choosed[data-name="micromotor-eletrico-kavo-intra-lux-kl-701"]:not(:visible)' );
        if( optional_choosed.data( 'name' ) == 'micromotor-eletrico-kavo-intra-lux-kl-701' && odd_micromotor.length ){
            resetConfig(odd_micromotor.parent().parent().find('.bt-confirm').data('field'));   
        }
        */
        var odd_micromotor = jQuery( '#user-customization').find( '.bt-optional[data-name="micromotor-eletrico-kavo-intra-lux-kl-701"]:not(.optional-choosed)' );

        if( odd_micromotor.length ){
            if( optional_choosed.data( 'name' ) == 'micromotor-eletrico-kavo-intra-lux-kl-701' ){
                odd_micromotor.hide().addClass( 'toggled' );
            }
            if( optional_prev_choosed.data( 'name' ) == 'micromotor-eletrico-kavo-intra-lux-kl-701' ){            
                odd_micromotor.show().removeClass( 'toggled' );
            }
            odd_micromotor.parent().find( '.bt-optional:not(.toggled)' ).each( function( i ){
                var odd_micromotor_opt = jQuery( this );
                odd_micromotor_opt.removeClass( 'opt-even' ).removeClass( 'opt-odd' );
                if( i % 2 == 0 ){
                    odd_micromotor_opt.addClass( 'opt-even' );
                }else{
                    odd_micromotor_opt.addClass( 'opt-odd' );
                }
            });
        }


        //Verifica se houveram mudanças em um campo de escolha obrigatória para desmarcar itens auto selecionados
        optional_choosed = jQuery('.custom-field.' + field).find('.optional-choosed');
        if(optional_prev_choosed.length > 0 && (optional_choosed.data('value') != optional_prev_choosed.data('value'))){
            unmark(optional_prev_choosed);
        }

        //Verifica se existem e se é necessário ativar algum item ao selecionar
        var required = jQuery('.custom-field.' + field).find('.optional-choosed').data('required');
        var required_itens = null;
        if(required != ''){
            if(typeof required == 'number'){
                required_itens = [required];
            }else{
                required_itens = required.split('|');
            }
            for(i = 0; i < required_itens.length; i++){
                jQuery('.custom-field.field_' + required_itens[i]).removeClass('custom-field-empty');
                jQuery('.custom-field.field_' + required_itens[i] + ' .bt-optional').removeClass('optional-choosed-temp').removeClass('optional-choosed').removeClass('optional-choosed-remember');
                jQuery('.custom-field.field_' + required_itens[i] + ' .bt-optional[data-value="1"]').addClass('optional-choosed').addClass('optional-choosed-remember');
                jQuery('.custom-field.field_' + required_itens[i] + ' .customizer-value').attr('value', 1);
                jQuery('.custom-item.field_' + required_itens[i]).addClass('custom-choosed');
                var label_name = jQuery('.custom-field.field_' + required_itens[i]).find('.optional-choosed').data('label');
                jQuery('#custom_item_field_' + required_itens[i] + ' .custom-item-choosed-text').html(label_name);

                //Adiciona imagem sobreposta
                var part = jQuery('#custom_item_field_' + required_itens[i] + ' .custom-item-button').data('part');
                showOverImage(part, 1, 'field_' + required_itens[i]);
                confirmOverImage('field_' + required_itens[i]);
            }
        }

    }
    confirmOverImage(field);
    if(!jQuery('#custom-itens').is(':visible')){
        jQuery('#custom-sidebar .tab').trigger('click');
    }
});
/*
 * Label: "Sim ou Não"
 * Location: #user-customization .custom-field
 * Description: Confirma a escolha de uma opção
 */
jQuery(document).on('click', '.bt-optional', function(){
    var self = jQuery(this);
    var parent = self.parent();
    var custom_field = undefined;

    //Uncomment for multiple choice
    /*if(parent.hasClass('multiple-choice')){
        parent = parent.parent();
        custom_field = jQuery('.custom-field.' + parent.find('input').attr('name'));

        if(self.hasClass('unselect_all')){
            parent.find('.bt-optional').removeClass('optional-choosed').removeClass('optional-choosed-temp');
            self.addClass('optional-choosed-temp');
            custom_field.removeClass('custom-field-empty');
        }else{
            parent.find('.bt-optional.unselect_all').removeClass('optional-choosed').removeClass('optional-choosed-temp');
            if(self.hasClass('optional-choosed-temp') || self.hasClass('optional-choosed')){
              self.removeClass('optional-choosed').removeClass('optional-choosed-temp');  
            }else{
                self.addClass('optional-choosed-temp');
            }
            if(parent.find('.optional-choosed-temp').length || parent.find('.optional-choosed').length){
                custom_field.removeClass('custom-field-empty');
            }
        }
    }else{*/
        //Comment here to allow multiple choice
        if(parent.hasClass('acessories-container')){
            parent = parent.parent();
        }
        //End comment here
        var field = parent.find('input').attr('name');
        var value = self.data('value');
        custom_field = jQuery('.custom-field.' + field);
        parent.find('.bt-optional').removeClass('optional-choosed').removeClass('optional-choosed-temp');
        self.addClass('optional-choosed-temp');
        custom_field.removeClass('custom-field-empty');
    //}
    custom_field.find('.custom-field-optional-instructions').removeClass('show');
    custom_field.find('.custom-field-optional-instructions-' + self.data('value')).addClass('show');

    //Mostra a imagem sobreposta
    var part = jQuery('#custom_item_' + field + ' .custom-item-button').data('part');
    showOverImage(part, value, field);
});

jQuery(document).on('click', '#bt-return-customizer', function(){
    jQuery('.step-back').trigger('click');
});

/* [/CONFIGURADOR] */

/* [FINALIZAÇÃO CONFIGURADOR]*/
/*
 * Label: "Finalziar Cadastro"
 * Location: #form-result
 * Description: Finaliza o cadastro e caso os itens já estejam preenchidos finaliza o configurador
 */
jQuery(document).on('click', '#bt-finish-registration', function(){
    if(isFormComplete()){
        if(jQuery('#validation-result').hasClass('validate-both')){
            jQuery('#form-result').addClass('registration-ok');
        }else{
            jQuery('#form-result').hide();
            finishCustomization();
            //jQuery('#over-images').fadeIn();
            showCustomizer(function(){
                jQuery('#custom-top').fadeIn();
                jQuery('#custom-bottom').fadeIn();
            });
        }
    }else{
        var which = jQuery(this).hasClass('default-input') ? 'default-input' : 'alt-input';
        if(validateFields(which)){
           jQuery('#form-result').hide();
            finishCustomization();
            //jQuery('#over-images').fadeIn();
            showCustomizer(function(){
                jQuery('#custom-top').fadeIn();
                jQuery('#custom-bottom').fadeIn();
            }); 
        }
    }
});
jQuery(document).on('click', '#bt-share', function(){
    var which = 'share-input';
    var self = jQuery(this);
    var button_text = self.val();
    
    if(self.hasClass('disabled')) return;

    if(validateFields(which)){
        self.addClass('disabled').val(self.data('alt-text'));
        jQuery.ajax({
            type: 'post',
            url: AQIAData.ajaxurl, 
            data: {
                '_ajax_nonce': AQIAData.nonce, 
                'action': 'aqia_share_mail',
                'form' : jQuery('#share-mail form').serialize(),
                'budget_id' : jQuery('#budget_id').val()
            },
            success : function(){
                self.removeClass('disabled').val(button_text);
                jQuery('#share-mail .form-clousure').hide();
                jQuery('#share-mail .share-completed').show();
            }
        });
    }
});
/* [/FINALIZAÇÃO CONFIGURADOR]*/

/* [SPOTS]*/
/*
 * Label: "span.spot"
 * Location: #chair-spots
 * Description: Abre uma janela de informação de um spot
 */
jQuery(document).on('click', '.spot', function(event){
    var self = jQuery(this);
    event.preventDefault();
    if(self.hasClass('info-spot')){
        jQuery('#custom-top').fadeOut();
        jQuery('#custom-bottom').fadeOut();
        hideCustomizer(function(){
            showOverlayer(function(){
                jQuery('.info-window').hide();
                jQuery(self.attr('href')).show();
                jQuery('#spot-windows').show();
                jQuery('.step-back').data('action', 'close-info-window');
            });
        });
    }else{
         jQuery('#custom-sidebar .scrollable').mCustomScrollbar('scrollTo', jQuery(self.attr('href')), { scrollInertia : 500});
    }
});

jQuery(document).on('click', '.custom-item-parent', function(){
    jQuery('#custom-sidebar .scrollable').mCustomScrollbar('scrollTo', jQuery(this), { scrollInertia : 500});
});

jQuery(document).on('click', '.close-info-window', function(){
    jQuery('.step-back').trigger('click');
});
/* [/SPOTS]*/
jQuery(document).on('click', '.benefit-menu-link', function(e){
    e.preventDefault();
    e.stopPropagation();
    var self = jQuery(this);
    var parent = self.parent();
    if(parent.hasClass('current-menu-item')) return;
    jQuery('.benefit-menu-item').removeClass('current-menu-item');
    parent.addClass('current-menu-item');
    jQuery('.benefit-content').hide();
    jQuery(self.attr('href')).fadeIn('fast');
});

jQuery(document).on('click', '#exbt-customize', function(){
    jQuery('.header-link[href="#customize-yours"]').trigger('click');
});

jQuery(document).on('click', '#close-video', function(){
    jQuery('body').addClass('video');
    onVideoEnded();
});

jQuery(document).on('click', '.cenarios-dropup-list-item', function(){
    var self = jQuery(this);
    var cenario = self.data('cenario');
    var parent = self.parent();
    jQuery('.cenarios-dropup-arrow img').hide();
    if(parent.hasClass('cenarios-dropup-list-closed')){
        jQuery('.cenarios-dropup-list-item').slideDown('fast');
        parent.removeClass('cenarios-dropup-list-closed');
        jQuery('.cenarios-dropup-arrow').attr('src', jQuery('.cenarios-dropup-arrow').data('alt'));
        jQuery('.cenarios-dropup-arrow img.alt-img').show();
    }else{
        if(!self.hasClass('cenarios-dropup-list-item-visible') && jQuery('#scenario-bg-' + cenario).length){
            showScenario(cenario); 
            jQuery('.aqia-form input[name="escritorio"]').val(cenario);
        }
        jQuery('.cenarios-dropup-list-item').hide().removeClass('cenarios-dropup-list-item-visible');
        self.addClass('cenarios-dropup-list-item-visible');
        parent.addClass('cenarios-dropup-list-closed');
        jQuery('.cenarios-dropup-arrow img.normal-img').show();
    }
}); 
jQuery(document).on('click', '.cenarios-dropup-arrow', function(){
    jQuery('.cenarios-dropup-list-item-visible').trigger('click');
});
jQuery(document).on('click', '#slides .square-button', function( e ){
    e.preventDefault();
    var href = jQuery(this).attr('href');
    jQuery('html, body').animate({
        scrollTop: jQuery('#screen-3').offset().top
    }, 700, function(){
        jQuery('#benefits .benefit-menu-link[href="' + href + '"]').trigger('click');
    });
});
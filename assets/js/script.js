

$(document).ready(function(){


    $('.main-search-param-box').off('click').on('click', function(){

        $('.main-search-block').not($(this).parents('.main-search-block')).removeClass('opened');
        $(this).parents('.main-search-block').toggleClass('opened');

    });

    $('.e-search-param-box').off('click').on('click', function(){

        $('.e-search-block').not($(this).parents('.e-search-block')).removeClass('opened');
        $(this).parents('.e-search-block').toggleClass('opened');

    });


    $('.venue-images-dot').off('click').on('click', function () {

        if($(this).hasClass('active')){
            return;
        }

        var self  =$(this);
        var idx = $(this).index();
        var p = $(this).parents('.venue-images-box');
        var t = p.find('.venue-images-train');

        t.animate({
            marginLeft: - (idx * 300) + 'px'
        }, 220, function () {

            p.find('.venue-images-dot').removeClass('active');
            self.addClass('active');

        });

    });

    $('.e-search-pick-param').off('click').on('click', function(){

        $(this).toggleClass('checked');

    });

    $('.map-search-extended-toggler').off('click').on('click', function(){

        $(this).toggleClass('opened');
        if($(this).hasClass('opened')){
            $(this).html('Скрыть расширенный поиск');
        }else{
            $(this).html('Расширенный поиск');
        }
        $('.map-search-extended').toggleClass('opened');

    });

});
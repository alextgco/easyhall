

$(document).ready(function(){


    $('.main-search-param-box').off('click').on('click', function(){

        $('.main-search-block').not($(this).parents('.main-search-block')).removeClass('opened');
        $(this).parents('.main-search-block').toggleClass('opened');

    });


});
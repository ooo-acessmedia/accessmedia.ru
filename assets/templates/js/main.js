(function ($) {

    'use strict';

    //Async load css

    var $pointAfter = $('link[rel="icon"]');

    $pointAfter.after('<link rel="stylesheet" type="text/css" href="assets/components/ajaxform/css/default.css">');
    //$pointAfter.after('<link rel="stylesheet" type="text/css" href="assets/components/minishop2/css/web/default.css">');


    //Стрелка вверх

    $.goup({
        'locationOffset': '5%',
        'bottomOffset': '5%'
    });

    //Слайдер категории

    var $categorySlider = $('.category-slider');
    $categorySlider.owlCarousel({
        items: 1,
        nav: true,
        navText: ["", ""],
        loop: true
    });

    $categorySlider.hover(function () {
        $(this).toggleClass('is-hover');
        $('.category-slider-item-description').toggleClass('fade-in-down');
    });


    // Сменяющиеся бг и ссылка на страницу

    var $serviceMenuItem = $('.service-menu > ul > li'),
        $contentBlockWrap = $('.l-content-block-wrap');

    $serviceMenuItem.on('click', function (event) {
        event.stopPropagation();
        var linkBg = $(this).data('bg'),
            linkUrl = $(this).data('url'),
            addUrlToBlockWrap = function () {
                window.location.pathname = linkUrl;
            };

        $contentBlockWrap.css({
            'opacity': 0,
            'background': 'url(' + linkBg + ') no-repeat center center fixed',
            'background-size': 'cover'
        }).animate({
            'opacity': 1
        }, 150);
        $serviceMenuItem.removeClass('active');
        $(this).addClass('active');

        $contentBlockWrap.off('click');

        $contentBlockWrap.on('click', function () {
            addUrlToBlockWrap();
        });
    });

    //Дозагрузка больших изображений для главной страницы через 2сек

    setTimeout(function () {
        $serviceMenuItem.each(function () {
           (new Image()).src = $(this).data('bg');
        });
    }, 2000);




    //Движение фона за мышью


    var movementStrength = 25;
    var height = movementStrength / $(window).height();
    var width = movementStrength / $(window).width();
    $('.main-page .l-content-block-wrap').mousemove(function (e) {
        var pageX = e.pageX - ($(window).width() / 2);
        var pageY = e.pageY - ($(window).height() / 2);
        var newvalueX = width * pageX * -1 - 25;
        var newvalueY = height * pageY * -1 - 50;
        $('.main-page .l-content-block-wrap').css("background-position", newvalueX + "px     " + newvalueY + "px");
    });




    //Главное меню - выпадающее меню

    $('.main-menu > ul > li').hover(function () {
        $('.main-menu > ul > li > ul').addClass('is-visible');

        $('.main-menu-wrap').addClass('is-hover-main-menu');
    }, function () {
        $('.main-menu > ul > li > ul').removeClass('is-visible');

        $('.main-menu-wrap').removeClass('is-hover-main-menu');
    });

    //Form

    var winWidth = $(window).width(),
        $form = $('.form-popup'),
        formWidth = $form.width(),
        thisPlaceholder;


    $form.css({
        left: winWidth / 2 - formWidth / 2
    });

    if (winWidth <= formWidth) {
        $form.css({
            'width': '100%',
            'left' : '0'
        });
    }


    $('.callout-button').on('click', function () {
        $('.form-popup, .form-fade').addClass('is-visible fade-in');
        setTimeout(function () {
            $('.form-popup, .form-fade').removeClass('fade-in');
        }, 300);
    });

    $('.form-fade, .form-popup-close').on('click', function () {
        $('.form-popup, .form-fade').addClass('fade-out');
        setTimeout(function () {
            $('.form-popup, .form-fade').removeClass('is-visible fade-out');
        }, 300);
    });

    $('.form-popup input, .form-popup textarea')
        .focus(function () {
            thisPlaceholder = $(this).attr('placeholder');
            $(this).data('placeholder', thisPlaceholder);
            $(this).attr('placeholder', '');
        })
        .blur(function () {
            thisPlaceholder = $(this).data('placeholder');
            $(this).attr('placeholder', thisPlaceholder);
        });

})(jQuery);




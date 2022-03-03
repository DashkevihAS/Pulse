$(document).ready(function(){

    const slider = tns({
        container: '.courusel__inner',
        items: 1,
        slideBy: 'page',
        autoplay: false,
        nav: false,
        controls: false,
        
    });

    document.querySelector('.prev').onclick = function () {
        slider.goTo('prev');
    };

    document.querySelector('.next').onclick = function () {
        slider.goTo('next');
    };

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
    });

    function toggleSlide(item) {
        $(item).each(function(i) {
            $(this).on('click', function(e) {
                e.preventDefault();
                $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
                $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
            });
        });
    };

    toggleSlide('.catalog-item__link');
    toggleSlide('.catalog-item__back');


    // modal windows

    $('[data-modal=consultation]').on('click', function() {
        $('.overlay, #consultation').fadeIn('slow');
    });

    $('.modal__close').on('click', function() {
        $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
    });

    $('.button_little').each(function(i) {
        $(this).on('click', function() {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        });
    });

    

    function valideForms (form) {
        $(form).validate({
            rules: {
                name: "required",
                phone: "required",
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: "Пожалуйста укажите Имя",
                phone: "Пожалуйста укажите ваш номер телефона",
                email: {
                required: "Пожалуйста укажите адрес вашей почты",
                email: "Адрес почты должен быть в формате name@domain.com"
                }
            }
        });
    }
    
    valideForms ('#consultation form');
    valideForms ('#order form');
    valideForms ('#consultation-form');

    $('input[name=phone]').mask("+375(99) 999-99-99");

    $('form').submit(function(e) {
        e.preventDefault();

        if (!$(this).valid()) {
            return;
        }


        $.ajax({
            type: "POST",
            url: "mailer/smart.php",
            data: $(this).serialize()
        }).done(function() {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });

    //smooth scroll and pageup

    $(window).scroll(function() {  
        if ($(this).scrollTop() > 1600) {
            $('.pageup').fadeIn();
        } else {
                $('.pageup').fadeOut();
        }
    }); 


            //  вместо   scroll-behavior: smooth для тега HTML для кроссбраузерности

    $("a[href='#up']").click(function(){
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    }); 

    new WOW().init();
});

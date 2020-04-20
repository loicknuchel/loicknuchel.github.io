'use strict';

$(function () {
    // enable Bootstrap tooltips for tags with attribute
    $('[data-toggle="tooltip"]').tooltip();

    $('.js-back').click(function (e) {
        if (document.referrer && document.referrer !== window.location.href) {
            e.preventDefault();
            window.history.go(-1);
            window.location.href = document.referrer;
        }
    });

    // enable Bootstrap carousels
    $('.carousel').each(function () {
        var $elt = $(this);
        $elt.carousel({
            pause: 'hover',
            interval: 5000
        });
        $elt.find('.carousel-control-prev').click(function () {
            $elt.carousel('prev');
        });
        $elt.find('.carousel-control-next').click(function () {
            $elt.carousel('next');
        });
    });

    // scroll to anchor: smooth scroll + menu offset
    $('a[href^="#"]:not([instant-scroll])').click(function () {
        var $target = $($(this).attr('href'));
        $('html, body').animate({scrollTop: $target.offset().top}, 800);
    });

    // fix menu on top
    (function () {
        var $window = $(window);
        var $menu = $('.menu');
        var $menuMobile = $('.mobile-menu');
        var active = null;

        function fixHeader() {
            if ($window.scrollTop() > 0) {
                if (active !== true) {
                    active = true;
                    $menu.addClass('menu--active');
                    $menuMobile.addClass('mobile-menu--active');
                }
            } else if (active !== false) {
                active = false;
                $menu.removeClass('menu--active');
                $menuMobile.removeClass('mobile-menu--active');
            }
        }

        fixHeader();
        $window.on('scroll', function () {
            fixHeader();
        });
    })();

    // open/close mobile menu
    $('.menu__mobile-button, .mobile-menu__close').on('click', function () {
        $('.mobile-menu').toggleClass('active');
    });
    $('.mobile-menu__wrapper ul li a').on('click', function () {
        $('.mobile-menu').removeClass('active');
    });

    // adds a ripple effect to buttons
    $('.site-btn').mbClicker({
        size: 300, // Maximum size of circle
        speed: 750, // Time of animation in miliseconds
        colour: 'rgba(0,0,0,0.11)', // Colour of circle and shadow
        shadow: false, // Whether or not to have a shadow on the circle
        buttonAnimation: true // Only use if button doesn't have a style attribute
    });

    // typing effects
    $('[data-typing-effect]').each(function () {
        var $elt = $(this);
        var offset = $elt.attr('data-typing-effect');

        // hide element
        $elt.css('text-indent', '-9999px');

        // show element with typing animation when in viewport
        $elt.waypoint({
            offset: offset,
            handler: function () {
                $elt.css('text-indent', '0px'); // show header
                var text = $elt.text();

                $elt.text('');
                var nextAnimationStep = function () {
                    if (text.length > 0) {
                        $elt.text($elt.text() + text.substr(0, 1));
                        text = text.substr(1);
                        setTimeout(nextAnimationStep, 100);
                    }
                };
                nextAnimationStep();

                this.destroy();
            }
        });
    });

    // read more
    $('[read-more]').each(function () {
        var $elt = $(this);
        var height = $elt.height();
        var maxHeight = $elt.attr('read-more');
        if (height > maxHeight) {
            $elt.addClass('read-more');
            $elt.css('max-height', maxHeight + 'px');
            $elt.after('<a href="#">Read more</a>');
            $elt.next().click(function (e) {
                e.preventDefault();
                var $btn = $(this);
                if ($btn.text() === 'Read more') {
                    $elt.css('max-height', height + 'px');
                    $btn.text('Read less');
                } else {
                    $elt.css('max-height', maxHeight + 'px');
                    $btn.text('Read more');
                }
            });
        }
    });

    // animate progress-bar
    $('.js-progress-list').waypoint({
        handler: function () {
            $('.progress-bar').each(function () {
                $(this).animate({
                    width: $(this).attr('aria-valuenow') + '%'
                }, 200);
            });
            this.destroy();
        }, offset: '50%'
    });

    // filter portfolio projects
    $('.portfolio-menu').on('click', 'a', function (e) {
        e.preventDefault();

        $('.portfolio-menu a').removeClass('portfolio-menu__link--active');

        var $menu = $(e.target);
        $menu.addClass('portfolio-menu__link--active');
        var selectedTag = $menu.data('portfolio-target-tag');
        var portfolioItems = $('.portfolio-cards').children();

        if (selectedTag === 'all') {
            portfolioItems.fadeIn({duration: 500});
        } else {
            portfolioItems.hide();
        }

        portfolioItems.each(function (index, value) {
            var $item = $(value);
            if ($item.data('portfolio-tag') === selectedTag) {
                $item.fadeIn({duration: 500});
            }
        });
    });

    // ajax contact form
    /* $('form.contact-form').submit(function (e) {
        e.preventDefault();
        var $form = $(this);
        var data = {};
        $form.find('input, textarea').each(function () {
            data[$(this).attr('name')] = $(this).val();
        });
        var opts = {
            type: $form.attr('method'),
            url: $form.attr('action'),
            headers: {'Accept': 'application/json'},
            data: data,
            success: function () {
                $form.html('<h3>Well done, message sent <i class="fas fa-thumbs-up"></i></h3>');
            },
            error: function (xhr, status, error) {
                console.error('Ajax options', opts);
                alert('Ooops, an error occured: ' + error);
            }
        };
        $.ajax(opts);
    }); */
});

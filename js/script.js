(function($) {
    $(document).ready(function(){
       // Cache references to DOM elements for performance
        var dom = {
            $window:            $(window),
            $body:              $('body'),
            $siteHeader:        $('#site-header')
        };

        var breakpoints = {
            sTablet:  576,
            tablet:  768,
            desktop: 992,
            wide:    1200
        }


        // @ Homepage
        if( dom.$body.hasClass('home') ) {
            stickyHeader();

            // On mobile, list images become a slider
            if(window.innerWidth < breakpoints.tablet) {
                listImagesSlider();
            }
            
            $(window).resize(function(e){
                // Init/Destroy list images slider on resize
                if(window.innerWidth < breakpoints.tablet) {
                    if(!$('.c-list-images').hasClass('slick-initialized')){
                        listImagesSlider();
                    }
                } else {
                    if($('.c-list-images').hasClass('slick-initialized')){
                        $('.c-list-images').slick('unslick');
                    }
                }
            });

            // Slider
            $('.c-slider').slick({
                centerMode: true,
                centerPadding: '0px',
                slidesToShow: 3,
                autoplay: true,
                autoplaySpeed: 3000,
                arrows: false,
                responsive: [
                    {
                        breakpoint: breakpoints.tablet,
                        settings: {
                            slidesToShow: 3
                        }
                    },
                    {
                        breakpoint: breakpoints.sTablet,
                        settings: {
                            centerMode: false,
                            slidesToShow: 1
                        }
                    }
                ]
            });

            // FAQS
            $('#faqs .btn-more').click(function(){
                if($(this).hasClass('active')) {
                     $('.faqs-list li:not(.active)').hide(350);
                }
                else {
                    $('.faqs-list li:not(.active)').show(350);
                }
                $(this).toggleClass('active');
            });
        }

        // Menu Spy
        var elm = document.querySelector('#site-header-cloned');
        var ms = new MenuSpy(elm);

        // Accordion
        $('.accordion .toggle').click(function(e) { 
            var $this = $(this);
            if ($this.next().hasClass('show')) {
                $this.next().removeClass('show');
                $this.next().slideUp(350);
            } else {
                $this.parent().parent().find('.inner').removeClass('show');
                $this.parent().parent().find('.inner').slideUp(350);
                $this.next().toggleClass('show');
                $this.next().slideToggle(350);
            }
        });

        // ######################################################
        // Global Functions
        // ######################################################
        function listImagesSlider() {
            $('.c-list-images').slick({
                autoplay: true,
                arrows: false
            });
        }

        function stickyHeader() {
            dom.$siteHeader
            .clone()
            .insertBefore( '#site-header' )
            .attr( 'id', function(i, str) { return str + '-cloned';} );
            dom.$siteHeaderClone = $('#site-header-cloned');
            var winH = dom.$window.height();   // Get the window height.

            dom.$window.on("scroll", function () {
                if ($(this).scrollTop() > winH ) {
                    dom.$siteHeaderClone.addClass('sticky');
                } else {
                    dom.$siteHeaderClone.removeClass('sticky');
                }
            });
        }
    });
}(jQuery));
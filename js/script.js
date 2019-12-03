(function($) {
    $(document).ready(function(){
       // Cache references to DOM elements for performance
        var dom = {
            $window:             $(window),
            $body:               $('body'),
            $siteHeader:         $('#site-header'),
            $siteSideNav:        $('#site-side-nav'),
            $siteSideNavClose:   $('#site-side-nav .side-nav-close'),
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

            // Timeline
            $('.c-timeline .event').click(function(){
                var id = $(this).attr('id');
                var $modal = $('.c-timeline .c-modal#modal-' + id.split('-')[1]);
                if($modal.find('.modal-slider').length) {
                    $('.modal-slider').slick({
                        arrows: false,
                        dots: true,
                        autoplay: true
                    });
                }
                $modal.addClass('active');
            });

            $('.c-modal .modal-close').click(function(){

                var $modal = $(this).parent();
                if($modal.find('.modal-slider').length) {
                    var $slider = $modal.find('.modal-slider');
                    if($slider.hasClass('slick-initialized')){
                        $slider.slick('unslick');
                    }
                }
                $modal.removeClass('active');
            });

            // Blueprint
            $('#c-blueprint .filters li').click(function(){
                $(this).siblings( ".active" ).removeClass('active');
                $(this).addClass('active');
                var id = $(this).attr('id');
                var $blueprint = $('#c-blueprint #blueprint-' + id.split('-')[1]);
                var $modal = $('#c-blueprint #modal-' + id.split('-')[1]);
                $modal.siblings( ".active" ).removeClass('active');
                $modal.addClass('active');
                $('#c-blueprint .blueprints .active').removeClass('active');
                $blueprint.addClass('active');
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
        new MenuSpy(document.querySelector('#site-header-cloned'));
        new MenuSpy(document.querySelector('#site-side-nav'));

        // Smooth Scroll to Anchor
        $(document).on('click', 'a[href^="#"]', function (event) {
            event.preventDefault();
        
            $('html, body').animate({
                scrollTop: ($($.attr(this, 'href')).offset().top)-60
            }, 800);
        });

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

        $('.site-cheeseburger').click(function(){
            dom.$body.addClass('side-nav-open');
        });

        dom.$siteSideNavClose.click(function(){
            dom.$body.removeClass('side-nav-open');
        });

        new WOW().init();

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
            var src = dom.$siteHeaderClone.find('.site-logo img').attr('src').replace("white", "black");
            dom.$siteHeaderClone.find('.site-logo img').attr('src', src);
            
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
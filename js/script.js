(function($) {
    $(document).ready(function(){
       // Cache references to DOM elements for performance
        var dom = {
            $window:            $(window),
            $body:              $('body'),
        };

        var breakpoints = {
            tablet:  768,
            desktop: 992,
            wide:    1200
        }

        // @ Homepage
        if( dom.$body.hasClass('home') ) {
            // On mobile, list images become a slider
            if(window.innerWidth < breakpoints.tablet) {
                listImagesSlider();
            }

            $(window).resize(function(e){
                if(window.innerWidth < breakpoints.tablet) {
                    if(!$('.list-images').hasClass('slick-initialized')){
                        listImagesSlider();
                    }
                } else {
                    if($('.list-images').hasClass('slick-initialized')){
                        $('.list-images').slick('unslick');
                    }
                }
            });
        }

        // Global functions
        function listImagesSlider() {
            $('.list-images').slick({
                autoplay: true,
                arrows: false
            });
        }
    });
}(jQuery));
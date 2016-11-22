(function(){

    //GLOBAL VARIABLES

    //GLOBAL FUNCTIONS

        /* Menu */
        if($("#menu").length){

            $(".menu-button").on("click", function(){
                $("#menu").toggleClass("open");
            });

            $(".close-button").on("click", function(){
                $("#menu").toggleClass("open");
            });
        }

        /* On Scroll Line Animation */

        if($(".vertical-title").length){

            $(window).scroll(function() { //when window is scrolled

                $(".vertical-title").each(function(){

                    var eTop = $(this).offset().top; //get the offset top of the element
                    var distanceFromTop = eTop - $(window).scrollTop();

                    if(distanceFromTop < 375 && !$(this).hasClass("active")){
                        console.log("activated!");
                        $(this).addClass("active");
                    }

                });

            });



        }

        /* Parallax */
        if($(".parallax").length){

            var parallax = document.querySelectorAll(".parallax"),
                speed = 0.15;

            window.onscroll = function(){
                [].slice.call(parallax).forEach(function(el,i){

                    var windowYOffset = window.pageYOffset,
                        elBackgrounPos = "0 " + (windowYOffset * speed) + "px";

                    el.style.backgroundPosition = elBackgrounPos;

                });
            };

        }

    //PAGES

        /* Home */
        if($("#home").length){

            console.log("The Abundancy / Home");

            var modal = $(".modal");

            $(".triangle").each(function(){
                var triangle = $(this),
                    randomDecimal = generateDecimal();

                TweenMax.set(triangle,{ top: generateStringPercentage(), left: generateStringPercentage(), scale:randomDecimal} );

                var bezier_path = [{ top: generateStringPercentage(), left: generateStringPercentage() }, { top: generateStringPercentage(), left: generateStringPercentage() }, { top: generateStringPercentage(), left: generateStringPercentage() }];

                TweenMax.to(triangle, 50, { bezier: { type: 'thru', values: bezier_path,curviness: 1, autoRotate: true}, ease: Power1.easeInOut, yoyo: true, repeat:-1});

            });

            $(".leadership li").on("click", function(){

                modal.css({top: $(this).position().top});
                modal.toggleClass("open animated fadeInUp");

                $('html, body').animate({
                    scrollTop: (modal.offset().top - modal.outerHeight())
                }, 2000);
                
            });

            $(".modal-button").on("click", function(){
                $(".modal").toggleClass("open animated fadeInUp");
            });
            
            function generateStringPercentage() {
                var min = 0,
                    max = 100,
                    percentage = Math.floor(Math.random() * (max - min + 1) + min).toString() + "%";
                return percentage;
            }

            function generateDecimal(){
                return (Math.random()).toFixed(2);
            }
            
        }

        /* Our Approach */
        if($("#approach").length){
            console.log("The Abundancy / Our Approach");
        }

        /* Our Work */
        if($("#cases").length){
            console.log("The Abundancy / Our Work");
        }

        /* Our Culture */
        if($("#culture").length){
            console.log("The Abundancy / Our Culture");

            var token = '390074368.1439f97.94f68308db0542b1bd4fe81f4abac769',
                num_photos = 8;

            $.ajax({
                url: 'https://api.instagram.com/v1/users/self/media/recent',
                dataType: 'jsonp',
                type: 'GET',
                data: {access_token: token, count: num_photos},
                success: function(data){
                    console.log(data);
                    for( num in data.data ){
                        $('.instagram-feed').append('<div class="box"><img src="'+data.data[num].images.standard_resolution.url+'"></div>');
                    }
                },
                error: function(data){
                    console.log(data);
                }
            });

        }

        /* Contact + Careers */
        if($("#contact").length){

            console.log("The Abundancy / Contact + Careers");

            $( ".input-field" ).focus(function() {
                $(this).parent().addClass("input-filled");
            });

            $( ".input-field" ).blur(function() {
                $(this).parent().removeClass("input-filled");
            });

            // Recruiter box
            $.ajax({
                url: 'https://jsapi.recruiterbox.com/v1/openings?client_name=theabundancy',
                contentType: 'application/json',
                success: function(response) {

                    for(var x = 0; x < response.objects.length; x++){

                        var position = response.objects[x];
                        var formatted = '<li>' + '<div class="position">' + position.title + '<br />' +
                                        position.location.city + ', ' + position.location.state + ', ' + position.location.country +
                                        '</div>' + '<div class="type">' + position.position_type + '</div>' +
                                        '<a href="'+ position.hosted_url +'" class="read-more" target="_blank">' + position.position_type + '</a>' +
                                        '</li>';
                        $(".openings").append(formatted);
                    }

                }
            });

        }


})();
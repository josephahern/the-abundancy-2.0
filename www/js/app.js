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

                    var windowYOffset = window.pageYOffset;

                    el.style.backgroundPosition = "0 " + (windowYOffset * speed) + "px";

                });
            };

        }

        /* Text Shuffle */

        if($("#shuffler").length){

            $("#shuffler").slotMachine({
                active	: 1,
                delay	: 450,
                auto	: 1500
            });

        }

    //PAGES

        /* Home */
        if($("#home").length){

            console.log("The Abundancy / Home");

            var modal = $(".modal");

            // Background flying triangles
            $(".triangle").each(function(){
                var triangle = $(this),
                    randomDecimal = generateDecimal();

                TweenMax.set(triangle,{ top: generateStringPercentage(), left: generateStringPercentage(), scale:randomDecimal} );

                var bezier_path = [{ top: generateStringPercentage(), left: generateStringPercentage() }, { top: generateStringPercentage(), left: generateStringPercentage() }, { top: generateStringPercentage(), left: generateStringPercentage() }];

                TweenMax.to(triangle, 50, { bezier: { type: 'thru', values: bezier_path,curviness: 1, autoRotate: true}, ease: Power1.easeInOut, yoyo: true, repeat:-1});

            });

            // Leadership profile squares
            $(".leadership li").on("click", function(){

                var name = $(this).find(".modal-name").text(),
                    title = $(this).find(".modal-title").text(),
                    iAmA = $(this).find(".modal-i_am_a").text(),
                    bio = $(this).find(".modal-bio").text();

                modal.find(".name").text(name);
                modal.find(".title").text(title);
                modal.find(".i_am_a").text(iAmA);
                modal.find(".text").text(bio);

                modal.css({top: $(this).position().top});
                modal.toggleClass("open animated fadeInUp");

                $('html, body').animate({
                    scrollTop: (modal.offset().top - modal.outerHeight())
                }, 2000);
                
            });

            // Modal close button
            $(".modal-button").on("click", function(){
                $(".modal").toggleClass("open animated fadeInUp");
            });

            // Animate Get Chosen text

            var chosenSmall = $("#get-chosen-small"),
                chosenLarge = $("#get-chosen-large"),
                chosenLargeOffsetTop = chosenLarge.offset().top;

            var totalDistanceNeededToTravel = chosenLarge.offset().top - chosenSmall.offset().top;
            var totalLeftDistanceNeededToTravel = chosenSmall.offset().left - chosenLarge.offset().left;

            function animateGetChosen() {

                if ($(window).width() > 680) {

                    var distanceFromTop = $(".parallax .small").offset().top - $(window).scrollTop();
                    console.log(distanceFromTop);
                    var totalDistanceTraveled = totalDistanceNeededToTravel - (chosenLarge.offset().top - chosenSmall.offset().top),
                        percentageTraveled = totalDistanceTraveled / totalDistanceNeededToTravel;

                    if(distanceFromTop < 350 && !chosenSmall.hasClass("complete")){

                        var distanceTopDifference = (350 - distanceFromTop);

                        var fontSize = 18 + ((60 - 18) * percentageTraveled);

                        if (fontSize >= 59) {

                            fontSize = 60;

                            chosenSmall.css({
                                color: '#F8F9D2',
                                top: chosenLarge.offset().top - 31,
                                left: chosenLarge.offset().left,
                                fontSize: 60 + "px",
                                lineHeight: 60 + "px",
                                transition: "all 0.4s ease"
                            });

                            chosenSmall.find("span").css({
                                color: '#C55227',
                                fontSize: "60px",
                                lineHeight: "60px"
                            });

                            chosenSmall.addClass("complete");

                            setTimeout(function(){
                                $(".btn.home.parallax-btn").addClass("animated fadeIn");
                            }, 500);

                            setTimeout(function(){
                                $(".clients ul").addClass("animated fadeIn");
                            }, 1000);

                        }

                        var leftOffset = -(totalLeftDistanceNeededToTravel * percentageTraveled);

                        chosenSmall.css({
                            top: distanceTopDifference,
                            left: leftOffset,
                            fontSize: fontSize + "px",
                            lineHeight: fontSize + "px"
                        });

                    }

                }

            }

            function generateStringPercentage() {
                var min = 0,
                    max = 100,
                    percentage = Math.floor(Math.random() * (max - min + 1) + min).toString() + "%";
                return percentage;
            }

            function generateDecimal(){
                return (Math.random()).toFixed(2);
            }

            function initHome(){
                animateGetChosen();
            }

            // window.scroll()
            $(window).scroll(function() {
                animateGetChosen();
            });

            // window.resize()
            $(window).resize(function() {
                animateGetChosen();
            });


            initHome();

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
                num_photos = 15;

            $.ajax({
                url: 'https://api.instagram.com/v1/users/self/media/recent',
                dataType: 'jsonp',
                type: 'GET',
                data: {access_token: token, count: num_photos},
                success: function(data){
                    console.log(data);

                    var imageCount = 0;

                    for( num in data.data ){
                        if (imageCount >= 8){
                            break;
                        }
                        if (data.data[num].type != 'video'){
                            $('.instagram-feed').append('<div class="box"><img src="'+data.data[num].images.standard_resolution.url+'"><div class="insta-overlay"><div class="insta-heart">'+ data.data[num].likes.count + '</div><div class="insta-comments">'+ data.data[num].comments.count + '</div></div></div>');
                            imageCount++;
                        }
                        console.log(imageCount);
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
                                        '</div>' + '<div class="type">' + position.position_type.replace(/[_-]/g, " ") + '</div>' +
                                        '<a href="'+ position.hosted_url +'" class="read-more" target="_blank">READ MORE</a>' +
                                        '</li>';
                        $(".openings").append(formatted);
                    }

                }
            });

        }


})();
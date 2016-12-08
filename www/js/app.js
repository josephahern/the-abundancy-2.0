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
                active : 1,
                delay : 400,
                auto : 1500,
                spins: 2
            });

        }

    //PAGES

        /* Interactive Masthead */

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
                modal.find("img").attr("src", "images/home/leadership/gif/" + $(this).attr("data-person") + ".gif");

                $(".modal-contain").toggleClass("open");
                modal.toggleClass("animated fadeInUp");

                $("html").addClass("noscroll");
                
            });

            // Modal close button
            $(".modal-button").on("click", function(){
                $(".modal-contain").toggleClass("open");
                $(".modal").toggleClass("animated fadeInUp");
                $("html").removeClass("noscroll");
            });

            // Animate Get Chosen text

            var chosenSmall = $("#get-chosen-small"),
                chosenLarge = $("#get-chosen-large");

            var totalDistanceNeededToTravel = chosenLarge.offset().top - chosenSmall.offset().top;
            var totalLeftDistanceNeededToTravel = chosenSmall.offset().left - chosenLarge.offset().left;

            function animateGetChosen() {

                if ($(window).width() > 680) {

                    var distanceFromTop = $(".parallax .small").offset().top - $(window).scrollTop();

                    var totalDistanceTraveled = totalDistanceNeededToTravel - (chosenLarge.offset().top - chosenSmall.offset().top),
                        percentageTraveled = totalDistanceTraveled / totalDistanceNeededToTravel;

                    if(distanceFromTop < 350 && !chosenSmall.hasClass("complete")){

                        var distanceTopDifference = (350 - distanceFromTop);

                        var fontSize = 18 + ((60 - 18) * percentageTraveled);

                        if (distanceFromTop < -40) {

                            chosenSmall.css({
                                color: '#F8F9D2',
                                top: totalDistanceNeededToTravel + 14,
                                left: -(totalLeftDistanceNeededToTravel),
                                fontSize: "60px",
                                lineHeight: "60px",
                                transition: "all 0.4s ease"
                            });

                            chosenSmall.find("span").css({
                                color: '#C55227',
                                fontSize: "60px",
                                lineHeight: "60px"
                            });

                            chosenSmall.addClass("complete");

                            setTimeout(function(){
                                chosenSmall.hide();
                                chosenLarge.css({
                                    opacity: 1
                                });
                                $(".btn.home.parallax-btn").addClass("animated fadeIn");
                            }, 500);

                            setTimeout(function(){
                                $(".clients ul").addClass("animated fadeIn");
                            }, 1000);

                        }

                        else {

                            var leftOffset = -(totalLeftDistanceNeededToTravel * percentageTraveled);

                            chosenSmall.css({
                                top: distanceTopDifference,
                                left: leftOffset,
                                fontSize: fontSize + "px",
                                lineHeight: fontSize + "px"
                            });

                        }

                    } else if (distanceFromTop > 350 && !chosenSmall.hasClass("complete")) {

                        chosenSmall.css({
                            color: '#DDDDDC',
                            top: 0,
                            left: 0,
                            fontSize: 18 + "px",
                            lineHeight: 18 + "px"
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

            // Graph SVG Iconography

            layer8();
            setInterval(layer8(), 6000);

            function layer8(){
                drawLine("#Layer_8 #line-8-1",0,2,"ease-in-out");
                drawLine("#Layer_8 #line-8-2",1900,0.5,"linear");
                drawLine("#Layer_8 #line-8-3",1900,0.5,"linear");
            }

            // ID OF LINE, DELAY OF START, LENGTH TO COMPLETE, EASING
            function drawLine(pathToDraw,delay,duration,easing){
                var path = document.querySelector(pathToDraw);
                var length = path.getTotalLength();
                path.style.transition = path.style.WebkitTransition = "none";
                path.style.strokeDasharray = length + " " + length;
                path.style.strokeDashoffset = length;
                path.getBoundingClientRect();
                path.style.transition = path.style.WebkitTransition = "stroke-dashoffset " + duration + "s " + easing;
                setTimeout(function(){
                    path.style.strokeDashoffset = "0";
                },delay);

            }

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
                            $('.instagram-feed').append('<div class="box"><img src="'+data.data[num].images.standard_resolution.url+'"><a class="insta-overlay" href="'+ data.data[num].link +'" target="_blank"><div class="insta-heart">'+ data.data[num].likes.count + '</div><div class="insta-comments">'+ data.data[num].comments.count + '</div></a></div>');
                            imageCount++;
                        }
                        console.log(imageCount);
                    }

                },
                error: function(data){
                    console.log(data);
                }
            });

            // Graph SVG Iconography

            setTimeout(function(){
                $("#bolt-lines").removeClass("bolt-before").addClass("bolt-after");
            },3000);

        }

        /* Contact + Careers */
        if($("#contact").length){

            console.log("The Abundancy / Contact + Careers");

            $( ".input-field" ).focus(function() {
                if(!$(this).hasClass("input-filled")){
                    $(this).parent().addClass("input-filled");
                }
            });

            $( ".input-field" ).blur(function() {

                if($(this).val() === '') {
                    $(this).parent().removeClass("input-filled");
                }

            });

            $('.dropdown').fancySelect();

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
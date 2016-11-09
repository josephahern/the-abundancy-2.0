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

    //PAGES

        /* Home */
        if($("#home").length){

            console.log("The Abundancy / Home");

            $(".triangle").each(function(){
                let triangle = $(this),
                    randomDecimal = generateDecimal();

                TweenMax.set(triangle,{ top: generateStringPercentage(), left: generateStringPercentage(), scale:randomDecimal} );

                let bezier_path = [{ top: generateStringPercentage(), left: generateStringPercentage() }, { top: generateStringPercentage(), left: generateStringPercentage() }, { top: generateStringPercentage(), left: generateStringPercentage() }];

                TweenMax.to(triangle, 50, { bezier: { type: 'thru', values: bezier_path,curviness: 1, autoRotate: true}, ease: Power1.easeInOut, yoyo: true, repeat:-1});

            });

            function generateStringPercentage() {
                let min = 0,
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

        }


})();
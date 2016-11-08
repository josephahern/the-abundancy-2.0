(function() {

    $(window).resize(function() {
        //generateText();
    });

    $("#home").scroll(function (e) {
        simpleParallax();
        console.log("scrolling!");
    });

    //Parallax
    function simpleParallax() {
        //This variable is storing the distance scrolled
        var scrolled = $(".scroll-wrapper").scrollTop() + 1;

        //Every element with the class "scroll" will have parallax background
        //Change the "0.3" for adjusting scroll speed.
        $('.parallax').css('background-position', '0' + -(scrolled * 0.3) + 'px');
    }

    // generateText
    function generateText(){

        if (!$(".chosen-series")){
            var parallaxContainer = $("#intro");

            var largePosition = $("#large-chosen"),
                smallPosition = $("#small-chosen"),
                xDifference = (smallPosition.position().left - largePosition.position().left),
                yDifference = (largePosition.position().top + largePosition.outerHeight(true) - smallPosition.top);

            console.log("lp:", largePosition);
            console.log("lh:", largePosition.outerHeight());
            console.log(smallPosition.left);

            console.log(xDifference);
            console.log(yDifference);

            var numIntervals = 25;

            var leftIncrement = xDifference / numIntervals,
                topIncrement = yDifference / numIntervals;


            // Create empty array to store left, top coordinates to be used when placing text.
            var leftIntervalArray = [],
                topIntervalArray = [];

            for (var x = 0; x < numIntervals; x++){

                if (typeof leftIntervalArray !== 'undefined' && leftIntervalArray.length > 0) {

                    leftIntervalArray.push(smallPosition.left + (leftIncrement * x ));
                    topIntervalArray.push(smallPosition.top + (topIncrement * x));

                } else {

                    leftIntervalArray.push(smallPosition.left + leftIncrement) ;
                    topIntervalArray.push(smallPosition.top + topIncrement) ;

                }

            }

            for(var y = 0; y < leftIntervalArray.length; y++){
                parallaxContainer.append('<span class="chosen-series" style="top: ' + topIntervalArray[y] + 'px; left:' + leftIntervalArray[y] + 'px;" data-count="'+ y +'">Get chosen</span>');
            }
        } else {
            $(".chosen-series").remove();
            generateText();
        }



    }

    if($('.parallax')){
        console.log('here');
    }

})();


$("body").scroll(function() {
    var scrolledY = $(".parallax").scrollTop();
    $('.parallax').css('background-position-y',((scrolledY*0.2))+'px');
    console.log(scrolledY);
});

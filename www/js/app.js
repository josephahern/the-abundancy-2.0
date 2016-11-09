(function(){

    //GLOBAL VARIABLES

    //GLOBAL FUNCTIONS

    //PAGES

    if($("#contact")){

        console.log("Welcome the Abundancy contact page");

        $( ".input-field" ).focus(function() {
            $(this).parent().addClass("input-filled");
        });

        $( ".input-field" ).blur(function() {
            $(this).parent().removeClass("input-filled");
        });

    }


})();
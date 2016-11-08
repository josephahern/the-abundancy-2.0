$( ".input-field" ).focus(function() {
    $(this).parent().addClass("input-filled");
});

$( ".input-field" ).blur(function() {
    $(this).parent().removeClass("input-filled");
});

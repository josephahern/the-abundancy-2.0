var THREEx = THREEx || {};

THREEx.WindowResize	= function(renderer, camera){

    var callback = function(){

        var currentWidth = document.getElementById("container").offsetWidth;
        var currentHeight = document.getElementById("container").offsetHeight;

        if (window.innerWidth > 720) {
            renderer.setSize( currentWidth, currentHeight);
            camera.aspect = currentWidth / currentHeight;
            camera.updateProjectionMatrix();
            camera.position.z = 1750;

        } else {

            var aspectRatio = (9/16);

            renderer.setSize( currentWidth, 1200);
            camera.aspect = aspectRatio;
            camera.updateProjectionMatrix();
            camera.position.z = 3000;
        }
    };

    window.addEventListener('resize', callback, false);

    return {
        trigger	: function(){
            callback()
        },
        stop : function(){
            window.removeEventListener('resize', callback);
        }
    };
};
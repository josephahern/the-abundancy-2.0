(function(){

    //GLOBAL VARIABLES

    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    };

    //GLOBAL FUNCTIONS

        if(isMobile.any() != null){
            $("#menu").addClass("mobile-orientation");
        }

        /* Menu */
        if($("#menu").length){

            $(".menu-button").on("click", function(){
                $("#menu").toggleClass("open");
                $("header").removeClass("headroom--pinned").addClass("headroom--unpinned");
                $("html").addClass("noscroll");
                console.log("menu open clicked");
            });

            $(".close-button").on("click", function(){
                $("#menu").removeClass("open");
                $("html").removeClass("noscroll");
                console.log("menu closed clicked");
            });
        }

        /* On Scroll Line Animation */

        if(isMobile.any() == null){
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
        }


        /* Parallax */

        if(isMobile.any() == null) {
            if ($(".parallax").length) {

                var parallax = document.querySelectorAll(".parallax"),
                    speed = 0.15;

                window.onscroll = function () {
                    [].slice.call(parallax).forEach(function (el, i) {

                        var windowYOffset = window.pageYOffset;

                        el.style.backgroundPosition = "0 " + (windowYOffset * speed) + "px";

                    });
                };

            }
        }

        /* Text Shuffle */

        if($("#shuffler").length){

            var shufflerIsMobile = false;

            if ($(window).width() < 680) {
                generateTickerMobile();
                shufflerIsMobile = true;
                console.log("Loading Mobile vTicker");
            } else {
                generateTickerDesktop();
                shufflerIsMobile = false;
                console.log("Loading Desktop vTicker");
            }

            $(window).resize(function() {

                if ($(window).width() < 680 && !shufflerIsMobile) {
                    $('#shuffler').vTicker('stop');
                    generateTickerMobile();
                    shufflerIsMobile = true;
                    console.log("Reloading mobile vTicker");
                }

                if ($(window).width() > 680 && shufflerIsMobile) {
                    $('#shuffler').vTicker('stop');
                    generateTickerDesktop();
                    shufflerIsMobile = false;
                    console.log("Reloading desktop vTicker");
                }


            });

            function generateTickerMobile(){

                if($("#approach").length){

                    $('#shuffler').vTicker('init', {
                        speed: 400,
                        pause: 1500,
                        height: 26,
                        autoAppend: false
                    });

                    $('#shuffler').on('vticker.afterTick', function(e) {
                        if($("#shuffler li").length < 3) {
                            $('#shuffler').vTicker('stop');
                        }
                    });

                } else {
                    $('#shuffler').vTicker('init', {
                        speed: 400,
                        pause: 1500,
                        height: 26
                    });
                }


            }

            function generateTickerDesktop(){

                if($("#approach").length){

                    $('#shuffler').vTicker('init', {
                        speed: 400,
                        pause: 1500,
                        height: 42,
                        autoAppend: false
                    });

                    $('#shuffler').on('vticker.beforeTick', function(e) {
                        if($("#shuffler li").length < 3) {
                            $('#shuffler').vTicker('stop');
                        }
                    });

                } else {
                    $('#shuffler').vTicker('init', {
                        speed: 400,
                        pause: 1500,
                        height: 42
                    });
                }



            }

        }

    //PAGES

        /* Interactive Masthead */
        /* ANTHONY'S STUFF HERE */
        if($("#home").length){
        // Loader Load

        function preLoader() {
            var group;
            var container, controls, stats;
            var camera, scene, renderer;

            var r = 800;
            var rHalf = r / 2;

            //preLoadInit();
            //preLoadAnimate();

            function preLoadInit() {

                container = document.getElementById( 'loader' );

                camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 4000 );
                camera.position.z = 1750;

                controls = new THREE.OrbitControls( camera, container );

                scene = new THREE.Scene();
                scene.background = new THREE.Color( 0x441C12 );

                group = new THREE.Group();
                scene.add( group );

                //

                // Custom basic 2D geometry
                function IsoscelesTriangleGeometry(base, height) {
                    this.geometry = new THREE.Geometry();
                    this.geometry.vertices.push( new THREE.Vector3(-base, 0, 0) );
                    this.geometry.vertices.push( new THREE.Vector3( base, 0, 0) );
                    this.geometry.vertices.push( new THREE.Vector3( 0, height, 0) );
                    this.geometry.faces.push( new THREE.Face3(0, 1, 2) );
                    this.geometry.computeFaceNormals();
                    this.geometry.computeVertexNormals();
                    return this.geometry;
                }

                function EquilateralTriangleGeometry(width) {
                    this.geometry = new THREE.Geometry();
                    this.geometry.vertices.push( new THREE.Vector3(-width, 0, 0) );
                    this.geometry.vertices.push( new THREE.Vector3( width, 0, 0) );
                    this.geometry.vertices.push( new THREE.Vector3( 0, width, 0) );
                    this.geometry.faces.push( new THREE.Face3(0, 1, 2) );
                    this.geometry.computeFaceNormals();
                    this.geometry.computeVertexNormals();
                    return this.geometry;
                }

                var ScaleneTriangleGeometry = function(base, sideA, sideB) {
                    this.geometry = new THREE.Geometry();
                    this.geometry.vertices.push( new THREE.Vector3(-base, 0, 0) );
                    this.geometry.vertices.push( new THREE.Vector3( base, 0, 0) );
                    this.geometry.vertices.push( new THREE.Vector3( sideA, sideB, 0) );
                    this.geometry.faces.push( new THREE.Face3(0, 1, 2) );
                    this.geometry.computeFaceNormals();
                    this.geometry.computeVertexNormals();
                    return this.geometry;
                };

                // Materials
                if( window.devicePixelRatio == 1 ) {
                    var basicMaterial = new THREE.MeshBasicMaterial( {side: THREE.DoubleSide, wireframe: true, color: 0xc65027, alphaTest:0.1, wireframeLinewidth: 25, transparent: true } );
                } else {
                    var basicMaterial = new THREE.MeshBasicMaterial( {side: THREE.DoubleSide, wireframe: true, color: 0xc65027, alphaTest:0.1, wireframeLinewidth: 25, transparent: true } );
                }

                // LEFT
                var scaleneTriangle1 = new ScaleneTriangleGeometry(200, 1, 220);
                var triangleA = new THREE.Mesh(scaleneTriangle1, basicMaterial);
                triangleA.position.set(-100, -200, 0);
                triangleA.rotation.y = Math.PI / 3;

                // FRONT
                var scaleneTriangle2 = new ScaleneTriangleGeometry(200, 100, 300);
                var triangleB = new THREE.Mesh(scaleneTriangle2, basicMaterial);
                triangleB.position.set(0, -200, 173);

                // RIGHT
                var scaleneTriangle3 = new ScaleneTriangleGeometry(200, -150, 350);
                var triangleC = new THREE.Mesh(scaleneTriangle3, basicMaterial);
                triangleC.position.set(100, -200, 0);
                triangleC.rotation.y = Math.PI / -3;

                // Add custom objects
                scene.add(triangleA);
                scene.add(triangleB);
                scene.add(triangleC);

                //

                renderer = new THREE.CanvasRenderer( { antialias: true, alpha: true } );
                renderer.setPixelRatio( window.devicePixelRatio );
                renderer.setSize( window.innerWidth, window.innerHeight );
                renderer.setClearColor(0x441C12, 0);
                renderer.gammaInput = true;
                renderer.gammaOutput = true;

                container.appendChild( renderer.domElement );

                window.addEventListener( 'resize', onWindowResize, false );

            }

            function preLoadAnimate() {

                controls.update();
                TWEEN.update();
                requestAnimationFrame( preLoadAnimate );
                preLoadRender();

            }

            function onWindowResize() {

                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize( window.innerWidth, window.innerHeight );
                console.log("resizing!");
            }

            function preLoadRender() {

                var time = Date.now() * 0.001;
                scene.rotation.y = time * 0.5;
                renderer.render( scene, camera );

            }

        }
        //preLoader();

        // Page Load

        var firstPromise = $.getJSON("http://windev.fq540.com:8001/api/departments");

        firstPromise.done(function(response) {

            var countParticles = 0;

            var responseJSON = $.parseJSON(response);
            var departments = [];
            var creativeDept = 0;
            var transparentDept = 0;

            $.each( responseJSON, function( key, val ) {
                countParticles += (val);
                /*Creative = Art, Content, Copy, Creative Director, UX Design */
                /*Transparent = Transparent Account, Transparent Technology */
                if(key === "Art" || key === "Content" || key === "Copy" || key === "Creative Director" || key === "User Experience Design" || key === "Executive") {
                    creativeDept += val;
                } else if(key === "Transparent Account" || key === "Transparent Technololgy") {
                    transparentDept += val;
                } else {
                    //console.log(key);
                    departments.push(val);
                }
                //console.log(key);
            });

            departments.push(creativeDept);
            departments.push(transparentDept);

            $("#loader").fadeOut("slow").css({"display":"none !important"});

            var group;
            var container, controls, stats;
            var particlesData = [];
            var camera, scene, renderer;
            var positions, colors, alphas;
            var particles;
            var pointCloud;
            var linesMesh;

            var uniforms, particlePositions, particleColor, particleSizes;

            var maxParticleCount = 200;
            var particleCount = countParticles;
            //var particleCount = 100;
            //var r = 1.06;
            var r = 1;
            var rHalf = r / 2;

            var effectController = {
                showDots: true,
                showLines: true,
                minDistance: 175,
                limitConnections: true,
                maxConnections: 10,
                particleCount: 0
            };

            var canvas1, context1, texture1, material1,
                canvas2, context2, texture2, material2,
                canvas3, context3, texture3, material3,
                canvas4, context4, texture4, material4,
                canvas5, context5, texture5, material5;

            var triangleMaterial;
            var triangleGroup = new THREE.Group();

            var projector;

            var tween1, tween2, tween12, tween22;
            var staticParticle, staticParticleMaterial;
            var curiousContext, curiousMaterial, curiousMesh;

            var PARTICLE_SIZE;

            if( window.devicePixelRatio == 1 ) {
                PARTICLE_SIZE = 45;
            } else {
                PARTICLE_SIZE = 90;
            }

            var raycaster, intersects, curiousIntersect;
            var mouse, INTERSECTED, CURIOUS_INTERSECTED;


            //console.log("Particle Count: " + particleCount);

            init();
            animate();

            //("#loader").promise().done(function() {
            //    init();
            //    animate();
            //});

            function init() {

                var winResize;
                container = document.getElementById( 'container' );

                //

                camera = new THREE.PerspectiveCamera( 45, (4/3), 1, 4000 );
                camera.position.z = 1750;

                controls = new THREE.OrbitControls( camera, container );

                scene = new THREE.Scene();
                scene.background = new THREE.Color( 0x441C12 );

                group = new THREE.Group();
                scene.add( group );

                // BOUNDING BOX
                var helper = new THREE.BoxHelper( new THREE.Mesh( new THREE.BoxGeometry( r*2, r*1.3, r ) ) );
                helper.material.color.setHex( 0xFFFFFF );
                helper.material.blending = THREE.AdditiveBlending;
                helper.material.transparent = true;
                helper.material.fog = false;
                //group.add( helper );

                var tweenHelper = new TWEEN.Tween(helper.scale)
                    .to({ x:800, y: 800, z: 800 }, 2000)
                    .easing(TWEEN.Easing.Sinusoidal.InOut)
                    .onUpdate(function () {
                        helper.scale.set(this.x, this.y, this.z);
                    }).start();

                // PARTICLES
                var segments = maxParticleCount * maxParticleCount;

                positions = new Float32Array( segments * 3 );
                colors = new Float32Array( segments * 3 );

                uniforms = {
                    color:     { value: new THREE.Color( 0xFFFFFF ) },
                    texture:   { value: new THREE.TextureLoader().load( "images/icons/ball.png" ) }
                };

                var pMaterial = new THREE.ShaderMaterial( {
                    uniforms:       uniforms,
                    vertexShader:   document.getElementById( 'vertexshader' ).textContent,
                    fragmentShader: document.getElementById( 'fragmentshader' ).textContent,
                    blending:       THREE.AdditiveBlending,
                    depthTest:      false,
                    transparent:    true,
                    alphaTest:			0.1,
                    fog: 						false
                });


                particles = new THREE.BufferGeometry();
                particlePositions = new Float32Array( maxParticleCount * 3 );
                particleColor = new Float32Array( maxParticleCount * 3 );
                particleSizes = new Float32Array( maxParticleCount );
                var color = new THREE.Color();

                var runningTotal;

                // Joe Added
                var segmentArray = [];
                var segmentCount = 0;
                var hslDegree = 1/360;
                var pColors = [
                    [ (hslDegree*014), 0.61, 0.42 ],    	// #c65230 // Account Management
                    [ (hslDegree*030), 0.98, 0.60 ],			// #fd9a34 // Analytics (Ardent)
                    [ (hslDegree*060), 0.72, 0.90 ],			// #f8f8d4 // Production
                    [ (hslDegree*000), 0.62, 0.54 ], 			// #d24141 // Project Management
                    [ (hslDegree*079), 0.39, 0.59 ], 			// #a5bf6d // Strategy
                    [ (hslDegree*196), 0.38, 0.52 ], 			// #5599b2 // Technology
                    [ (hslDegree*030), 0.86, 0.39 ], 			// #b8640e // Executives (The Abundancy)
                    [ (hslDegree*042), 0.99, 0.68 ], 			// #fece5c // Creative
                    [ (hslDegree*163), 0.17, 0.72 ] 			// #abc3bc // Media (Transparent)
                ];

                // Joe Added
                for (var x = 1; x <= 9; x++){
                    segmentArray.push(departments[x] + segmentCount);
                    segmentCount += departments[x];
                }

                for ( var i = 0; i < maxParticleCount; i++ ) {

                    var x = Math.random() * r - r / 2;
                    var y = Math.random() * r - r / 2;
                    var z = Math.random() * r - r / 2;

                    particlePositions[ i * 3     ] = x;
                    particlePositions[ i * 3 + 1 ] = y;
                    particlePositions[ i * 3 + 2 ] = z;

                    // Joe Added
                    for(var y = pColors.length-1; y >= 0; y--){
                        if (i > segmentArray[pColors.length-1] ){
                            color.setHSL( 1, 1, 1) ;
                        }
                        if (i <= segmentArray[y]){
                            color.setHSL( pColors[y][0], pColors[y][1], pColors[y][2]) ;
                        }
                    }

                    console.log(color.getHexString());

                    particleColor[ i * 3     ] = color.r;
                    particleColor[ i * 3 + 1 ] = color.g;
                    particleColor[ i * 3 + 2 ] = color.b;

                    particleColor[ i * 3     ] = color.r;
                    particleColor[ i * 3 + 1 ] = color.g;
                    particleColor[ i * 3 + 2 ] = color.b;


                    if( window.devicePixelRatio == 1 ) {
                        particleSizes[ i ] = 45;
                    } else {
                        particleSizes[ i ] = 90;
                    }

                    // add it to the geometry
                    particlesData.push( {
                        velocity: new THREE.Vector3( -1 + Math.random() * 2, -1 + Math.random() * 2,  -1 + Math.random() * 2 ),
                        numConnections: 0,
                        name: i
                    } );

                    if ( i <= (particleCount*.3333) ) {
                        r = r+2;
                    } else if (i > particleCount*.3333 && i <= particleCount*.6666){
                        r = r+3;
                    } else {
                        r = r+4.6;
                    }

                    rHalf = r / 2;

                }

                particles.setDrawRange( 0, particleCount );
                particles.addAttribute( 'position', new THREE.BufferAttribute( particlePositions, 3 ).setDynamic( true ) );
                particles.addAttribute( 'customColor', new THREE.BufferAttribute( particleColor, 3 ) );
                particles.addAttribute( 'size', new THREE.BufferAttribute( particleSizes, 1 ) );


                // create the particle system
                pointCloud = new THREE.Points( particles, pMaterial );
                group.add( pointCloud );

                //

                var ScaleneTriangleGeometry = function(base, sideA, sideB) {
                    this.geometry = new THREE.Geometry();
                    this.geometry.vertices.push( new THREE.Vector3(-base, 0, 0) );
                    this.geometry.vertices.push( new THREE.Vector3( base, 0, 0) );
                    this.geometry.vertices.push( new THREE.Vector3( sideA, sideB, 0) );
                    this.geometry.faces.push( new THREE.Face3(0, 1, 2) );
                    this.geometry.computeFaceNormals();
                    this.geometry.computeVertexNormals();
                    return this.geometry;
                };

                // Materials
                triangleMaterial = new THREE.MeshBasicMaterial( {side: THREE.DoubleSide, wireframe: true, color: 0xc65027, alphaTest:0.1, wireframeLinewidth: 2, transparent: true } );
                console.log(triangleMaterial);
                // LEFT
                var scaleneTriangle1 = new ScaleneTriangleGeometry(200, 1, 220);
                var triangleA = new THREE.Mesh(scaleneTriangle1, triangleMaterial);
                triangleA.position.set(-100, -200, 0);
                triangleA.rotation.y = Math.PI / 3;

                // FRONT
                var scaleneTriangle2 = new ScaleneTriangleGeometry(200, 100, 300);
                var triangleB = new THREE.Mesh(scaleneTriangle2, triangleMaterial);
                triangleB.position.set(0, -200, 173);

                // RIGHT
                var scaleneTriangle3 = new ScaleneTriangleGeometry(200, -180, 280);
                var triangleC = new THREE.Mesh(scaleneTriangle3, triangleMaterial);
                triangleC.position.set(100, -200, 0);
                triangleC.rotation.y = Math.PI / -3;

                triangleGroup.add(triangleA);
                triangleGroup.add(triangleB);
                triangleGroup.add(triangleC);

                triangleGroup.scale.set(0.35,0.3,0.35);
                triangleGroup.position.set(-190,280,0);
                triangleGroup.rotation.x = 0.35;
                triangleGroup.rotation.y = 0.05;
                triangleGroup.rotation.z = -0.01;

                scene.add(triangleGroup);

                // STATIC PARTICLE AND TEXT
                canvas1 = document.createElement('canvas');
                canvas1.needsUpdate = true;
                canvas1.width = 1055;

                canvas2 = document.createElement('canvas');
                canvas2.needsUpdate = true;
                canvas2.width = 730;

                canvas3 = document.createElement('canvas');
                canvas3.needsUpdate = true;
                canvas3.width = 490;

                canvas4 = document.createElement('canvas');
                canvas4.needsUpdate = true;
                canvas4.width = 150;

                canvas5 = document.createElement('canvas');
                canvas5.needsUpdate = true;
                canvas5.width = 350;

                context1 = canvas1.getContext('2d');
                context1.font = "Bold 64px 'Futura W01'";
                context1.fillStyle = "rgba(255,255,255,1)";
                var ctext = "WHAT A BEAUTIFUL VARIETY.".split("").join(String.fromCharCode(8202));
                context1.fillText(ctext, 0, 80);

                context2 = canvas2.getContext('2d');
                context2.font = "500 36px 'Futura W01'";
                context2.fillStyle = "rgba(255,255,200,1)";
                ctext = "WE'RE REINVENTING MARKETING".split("").join(String.fromCharCode(8201));
                context2.fillText(ctext, 0, 40);

                context3 = canvas3.getContext('2d');
                context3.font = "500 36px 'Futura W01'";
                context3.fillStyle = "rgba(255,255,200,1)";
                ctext = "FOR MODERN CLIENTS".split("").join(String.fromCharCode(8201));
                context3.fillText(ctext, 0, 40);

                context4 = canvas4.getContext('2d');
                context4.fillStyle = 'rgba(255,255,255,0.01)';
                context4.fillRect(0,64,canvas4.width,canvas4.height);
                context4.fillStyle = "rgba(255,255,255,1)";
                context4.font = "500 58px 'Futura W01'";
                context4.fillText("THE", 0, 64);

                context5 = canvas5.getContext('2d');
                context5.fillStyle = 'rgba(255,255,255,0.01)';
                context5.fillRect(0,64,canvas5.width,canvas5.height);
                context5.fillStyle = "rgba(255,255,255,1)";
                context5.font = "500 58px 'Futura W01'";
                context5.fillStyle = "rgba(255,255,255,1)";
                context5.fillText("ABUNDANCY", 0, 64);

                texture1 = new THREE.Texture( canvas1 );
                texture1.needsUpdate = true;
                texture1.minFilter = THREE.LinearFilter;

                texture2 = new THREE.Texture( canvas2 );
                texture2.needsUpdate = true;
                texture2.minFilter = THREE.LinearFilter;

                texture3 = new THREE.Texture( canvas3 );
                texture3.needsUpdate = true;
                texture3.minFilter = THREE.LinearFilter;

                texture4 = new THREE.Texture( canvas4 );
                texture4.needsUpdate = true;
                texture4.premultiplyAlpha = false;
                texture4.minFilter = THREE.LinearFilter;

                texture5 = new THREE.Texture( canvas5 );
                texture5.needsUpdate = true;
                texture5.premultiplyAlpha = false;
                texture5.minFilter = THREE.LinearFilter;

                material1 = new THREE.MeshBasicMaterial( { map: texture1, color: 0xFFFFFF, transparent: true, opacity: 1, side: THREE.DoubleSide, alphaTest: 0.1 });
                material1.needsUpdate = true;

                material2 = new THREE.MeshBasicMaterial( { map: texture2, color: 0xFFFFFF, transparent: true, opacity: 1, side: THREE.DoubleSide, alphaTest: 0.1 });
                material2.needsUpdate = true;

                material3 = new THREE.MeshBasicMaterial( { map: texture3, color: 0xFFFFFF, transparent: true, opacity: 1, side: THREE.DoubleSide, alphaTest: 0.1 });
                material3.needsUpdate = true;

                material4 = new THREE.MeshBasicMaterial( { map: texture4, color: 0xFFFFFF, transparent: true, opacity: 1, side: THREE.DoubleSide, alphaTest: 0.1 });
                material4.needsUpdate = true;

                material5 = new THREE.MeshBasicMaterial( { map: texture5, color: 0xFFFFFF, transparent: true, opacity: 1, side: THREE.DoubleSide, alphaTest: 0.1 });
                material5.needsUpdate = true;


                var mesh1 = new THREE.Mesh( new THREE.PlaneGeometry(canvas1.width, canvas1.height), material1 );
                mesh1.position.set(0,0,0);
                mesh1.needsUpdate = true;
                mesh1.name = "Title";

                var mesh2 = new THREE.Mesh( new THREE.PlaneGeometry(canvas2.width, canvas2.height), material2 );
                mesh2.position.set(0,-150,0);
                mesh2.needsUpdate = true;

                var mesh3 = new THREE.Mesh( new THREE.PlaneGeometry(canvas3.width, canvas3.height), material3 );
                mesh3.position.set(0,-200,0);
                mesh3.needsUpdate = true;

                var mesh4 = new THREE.Mesh( new THREE.PlaneGeometry(canvas4.width, canvas4.height), material4 );
                mesh4.position.set(-30,254,0);
                mesh4.needsUpdate = true;

                var mesh5 = new THREE.Mesh( new THREE.PlaneGeometry(canvas5.width, canvas5.height), material5 );
                mesh5.position.set(65,196,0);
                mesh5.needsUpdate = true;

                scene.add( mesh1 );
                scene.add( mesh2 );
                scene.add( mesh3 );
                scene.add( mesh4 );
                scene.add( mesh5 );

                /*var staticParticleGeometry = new THREE.Geometry();
                staticParticleGeometry.vertices.push(
                    new THREE.Vector3( 400, -400, 0 )
                );*/

                /*staticParticleMaterial = new THREE.PointsMaterial({
                    color: 				0x45d6f8,
                    size:					48,
                    map: 					new THREE.TextureLoader().load( "images/icons/ball.png" ),
                    transparent:	true,
                    opacity:      0
                });*/

                //staticParticle = new THREE.Points(staticParticleGeometry, staticParticleMaterial);
                //scene.add( staticParticle );

                //curiousCanvas = document.createElement('canvas');
                //curiousCanvas.needsUpdate = true;
                //curiousCanvas.width = 135;
                //curiousCanvas.height = 20;

                //curiousContext = curiousCanvas.getContext('2d');
                //curiousContext.font = "Bold 16px Futura";
                //curiousContext.fillStyle = "rgba(255,155,32,1)";
                //var ctext = "CURIOUS?".split("").join(String.fromCharCode(8201));
                //curiousContext.fillText(ctext, 0, 20);

                //curiousTexture = new THREE.Texture( curiousCanvas )
                //curiousTexture.needsUpdate = true;
                //curiousTexture.minFilter = THREE.LinearFilter

                //curiousMaterial = new THREE.MeshBasicMaterial( { map: curiousTexture, color: 0xFFFFFF, transparent: true, opacity: 0, side: THREE.DoubleSide, alphaTest: 0.5 });
                //curiousMaterial.needsUpdate = true;

                //curiousMesh = new THREE.Mesh( new THREE.PlaneGeometry(curiousCanvas.width, curiousCanvas.height), curiousMaterial );
                //curiousMesh.position.set(487,-396,0);
                //curiousMesh.needsUpdate = true;
                //curiousMesh.name = "Curious";

                //curiousMesh.callback = function() { showStats(); }
                //scene.add( curiousMesh );

                //

                var geometry = new THREE.BufferGeometry();

                geometry.addAttribute( 'position', new THREE.BufferAttribute( positions, 3 ).setDynamic( true ) );
                geometry.addAttribute( 'color', new THREE.BufferAttribute( colors, 3 ).setDynamic( true ) );

                geometry.computeBoundingSphere();
                geometry.setDrawRange( 0, 0 );

                //

                var material = new THREE.LineBasicMaterial( {
                    color: 0x666666,
                    vertexColors: THREE.VertexColors,
                    blending: THREE.AdditiveBlending,
                    transparent: true
                } );

                linesMesh = new THREE.LineSegments( geometry, material );
                group.add( linesMesh );

                //

                setTimeout(function(){
                    var interval = setInterval(function () {

                        effectController.maxConnections = effectController.maxConnections + 1;
                        effectController.minDistance = effectController.minDistance + 4;
                        //console.log(effectController.maxConnections);
                        if (effectController.maxConnections >= 50) {
                            clearInterval(interval);
                        }
                    }, 200);
                }, 1000);

                //

                projector = new THREE.Projector();

                renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
                renderer.setPixelRatio( window.devicePixelRatio );
                renderer.setSize( document.getElementById("container").offsetWidth, document.getElementById("container").offsetWidth / (4/3) );
                renderer.setClearColor(0x441C12, 0);

                renderer.gammaInput = false;
                renderer.gammaOutput = false;

                container.appendChild( renderer.domElement );

                //

                raycaster = new THREE.Raycaster();
                mouse = new THREE.Vector2();
                raycaster.params.Points.threshold = 40;

                window.addEventListener( 'resize', resizeDataViz, false );
                windowResize = THREEx.WindowResize(renderer, camera);

                windowResize.trigger();

                resizeDataViz();

                /*var curiousDot = function(){

                    tween1 = new TWEEN.Tween(staticParticle.material).to( { opacity: 1 }, 500 ).easing(TWEEN.Easing.Sinusoidal.InOut);
                    tween2 = new TWEEN.Tween(curiousMesh.material).to( { opacity: 1 }, 500 ).easing(TWEEN.Easing.Sinusoidal.InOut);

                    tween1.start();
                    tween2.start();

                    tween1.onComplete( function () {
                        setTimeout(function(){
                            tween12.start();
                            tween22.start();
                        }, 5000);

                    });

                    //tween12 = new TWEEN.Tween(staticParticle.material).to( { opacity: 0 }, 500 ).easing(TWEEN.Easing.Sinusoidal.InOut);
                    //tween22 = new TWEEN.Tween(curiousMesh.material).to( { opacity: 0 }, 500 ).easing(TWEEN.Easing.Sinusoidal.InOut);

                }*/

                if (window.innerWidth > 720) {
                    //var curiousDotTime = setInterval(curiousDot,2000);
                }

                var $window = $(window);
                //$window.on('scroll', scrollPage);
                $window.on('resize', resizeDataViz);

                function resizeDataViz(){

                    if (window.innerWidth < 720) {

                        if($("#container").hasClass("back")){
                            stopDrag();
                        }

                        controls.enabled = false;

                        material1.opacity = 0;
                        material2.opacity = 0;
                        material3.opacity = 0;
                        material4.opacity = 0;
                        material5.opacity = 0;
                        triangleMaterial.opacity = 0;
                        //staticParticleMaterial.opacity = 0;
                        //curiousMaterial.opacity = 0;
                        document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
                        document.removeEventListener('mouseup', stopDrag, false);
                        document.removeEventListener('mousedown', startDrag, false);
                        document.getElementById("container").removeEventListener('click', onDocumentMouseDown, false );

                        //clearInterval(curiousDotTime);

                    } else {

                        controls.enabled = true;

                        if(!$("#container").hasClass("back")){
                            material1.opacity = 1;
                            material2.opacity = 1;
                            material3.opacity = 1;
                            material4.opacity = 1;
                            material5.opacity = 1;
                            triangleMaterial.opacity = 1;
                            $("#curious-text").fadeIn();
                        }

                        //staticParticleMaterial.opacity = 1;
                        //curiousMaterial.opacity = 1;

                        document.removeEventListener( 'mousemove', onDocumentMouseMove, false );
                        document.removeEventListener('mouseup', stopDrag, false);
                        document.removeEventListener('mousedown', startDrag, false);
                        document.getElementById("container").removeEventListener('click', onDocumentMouseDown, false );

                        document.addEventListener( 'mousemove', onDocumentMouseMove, false );
                        document.addEventListener('mouseup', stopDrag, false);
                        document.addEventListener('mousedown', startDrag, false);
                        document.getElementById("container").addEventListener('click', onDocumentMouseDown, false );

                        //clearInterval(curiousDotTime);
                        //curiousDotTime = setInterval(curiousDot,2000);

                    }
                }

                $("#curious-text").on("click", function(){
                    showStats();
                });

                function scrollPage(){

                    if (window.innerWidth > 720) {
                        if ($(document).scrollTop() > 0) {
                            var factor = ($(document).scrollTop() * 10);
                            //staticParticleMaterial.opacity = (1 - (factor / 1000));
                            //curiousMaterial.opacity = (1 - (factor / 1000));
                            //clearInterval(curiousDotTime);
                        } else {
                            //curiousDotTime = setInterval(curiousDot, 2000);
                        }
                    }

                }
            }

            function animate() {

                controls.update();
                TWEEN.update();

                var vertexpos = 0;
                var colorpos = 0;
                var numConnected = 0;

                for ( var i = 0; i < particleCount; i++ )
                    particlesData[ i ].numConnections = 0;

                for ( var i = 0; i < particleCount; i++ ) {

                    // get the particle
                    var particleData = particlesData[i];

                    particlePositions[ i * 3     ] += particleData.velocity.x;
                    particlePositions[ i * 3 + 1 ] += particleData.velocity.y;
                    particlePositions[ i * 3 + 2 ] += particleData.velocity.z;

                    if ( particlePositions[ i * 3 + 1 ] < -(rHalf*1.3) || particlePositions[ i * 3 + 1 ] > (rHalf*1.3) )
                        particleData.velocity.y = -particleData.velocity.y;

                    if ( particlePositions[ i * 3 ] < -(rHalf*2) || particlePositions[ i * 3 ] > (rHalf*2) )
                        particleData.velocity.x = -particleData.velocity.x;

                    if ( particlePositions[ i * 3 + 2 ] < -rHalf || particlePositions[ i * 3 + 2 ] > rHalf )
                        particleData.velocity.z = -particleData.velocity.z;

                    if ( effectController.limitConnections && particleData.numConnections >= effectController.maxConnections )
                        continue;

                    // Check collision
                    for ( var j = i + 1; j < particleCount; j++ ) {

                        var particleDataB = particlesData[ j ];
                        if ( effectController.limitConnections && particleDataB.numConnections >= effectController.maxConnections )
                            continue;

                        var dx = (particlePositions[ i * 3     ] - particlePositions[ j * 3     ])*2;
                        var dy = particlePositions[ i * 3 + 1 ] - particlePositions[ j * 3 + 1 ];
                        var dz = particlePositions[ i * 3 + 2 ] - particlePositions[ j * 3 + 2 ];
                        var dist = Math.sqrt( dx * dx + dy * dy + dz * dz );

                        if ( dist < effectController.minDistance ) {

                            particleData.numConnections++;
                            particleDataB.numConnections++;

                            var alpha = 1.0 - dist / effectController.minDistance;

                            positions[ vertexpos++ ] = particlePositions[ i * 3     ];
                            positions[ vertexpos++ ] = particlePositions[ i * 3 + 1 ];
                            positions[ vertexpos++ ] = particlePositions[ i * 3 + 2 ];

                            positions[ vertexpos++ ] = particlePositions[ j * 3     ];
                            positions[ vertexpos++ ] = particlePositions[ j * 3 + 1 ];
                            positions[ vertexpos++ ] = particlePositions[ j * 3 + 2 ];

                            colors[ colorpos++ ] = alpha;
                            colors[ colorpos++ ] = alpha;
                            colors[ colorpos++ ] = alpha;

                            colors[ colorpos++ ] = alpha;
                            colors[ colorpos++ ] = alpha;
                            colors[ colorpos++ ] = alpha;

                            numConnected++;
                        }
                    }
                }

                linesMesh.geometry.setDrawRange( 0, numConnected * 2 );
                linesMesh.geometry.attributes.position.needsUpdate = true;
                linesMesh.geometry.attributes.color.needsUpdate = true;

                pointCloud.geometry.attributes.position.needsUpdate = true;

                requestAnimationFrame( animate );
                //stats.update();
                render();

            }

            function showStats() {

                var from = {
                    y: scene.rotation.y,
                    opacity: 1
                };

                var to = {
                    y: 3,
                    opacity: 0
                };

                var tween = new TWEEN.Tween(from)
                    .to(to, 1000)
                    .easing(TWEEN.Easing.Sinusoidal.InOut)
                    .onUpdate(function () {
                        scene.rotation.y = this.y;
                        camera.lookAt(scene.position);
                        material1.opacity = this.opacity;
                        material2.opacity = this.opacity;
                        material3.opacity = this.opacity;
                        material4.opacity = this.opacity;
                        material5.opacity = this.opacity;
                        triangleMaterial.opacity = this.opacity;
                        //staticParticleMaterial.opacity = this.opacity;
                        $("#curious-text").css({'opacity': this.opacity});
                        //curiousMaterial.opacity = this.opacity;
                    })
                    .onComplete(function () {
                        camera.lookAt(new THREE.Vector3(0, 0, 0));
                        $("#home-overlay").css("display", "flex").hide().fadeIn(500);
                        $("html").addClass("noscroll");
                        $("body").addClass("noscroll");
                        console.log("data viz back side");
                        $("#container").addClass("back");
                        $("#curious-text").css({'display':'none'});
                    }).start();

                var from = {
                    x: triangleGroup.rotation.x,
                    y: triangleGroup.rotation.y,
                    z: triangleGroup.rotation.z
                };

                var to = {
                    x: 0,
                    y: 0,
                    z: 0
                };

                var tween = new TWEEN.Tween(from)
                    .to(to, 1000)
                    .easing(TWEEN.Easing.Sinusoidal.InOut)
                    .onUpdate(function () {
                        triangleGroup.rotation.set(this.x, this.y, this.z);
                    })
                    .onComplete(function () {
                    }).start();

            }

            function onDocumentMouseMove( event ) {
                event.preventDefault();
                mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
                mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

            }

            function onDocumentMouseDown( event ) {
                event.preventDefault();
                mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
                mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
                raycaster.setFromCamera( mouse, camera );
                /*var curiousIntersect = raycaster.intersectObject( curiousMesh );
                if ( curiousIntersect.length > 0 ) {
                    curiousIntersect[0].object.callback();
                }*/
            }

            function startDrag(event) {

                $("#scroll-down").fadeOut();

                var from = {
                    x: triangleGroup.rotation.x,
                    y: triangleGroup.rotation.y,
                    z: triangleGroup.rotation.z
                };

                var to = {
                    x: 0,
                    y: 0,
                    z: 0
                };

                var tween = new TWEEN.Tween(from)
                    .to(to, 1000)
                    .easing(TWEEN.Easing.Sinusoidal.InOut)
                    .onUpdate(function () {
                        triangleGroup.rotation.set(this.x, this.y, this.z);
                    })
                    .onComplete(function () {
                    }).start();
            }

            function stopDrag(event) {

                $("#curious-text").css({'display':'block', 'opacity': 0});

                var from = {
                    x: triangleGroup.rotation.x,
                    y: triangleGroup.rotation.y,
                    z: triangleGroup.rotation.z,
                    opacity: material1.opacity,
                    scene: scene.rotation.y
                };

                var to = {
                    x: 0.35,
                    y: 0.05,
                    z: -0.01,
                    opacity: 1,
                    scene: 0
                };

                var tween = new TWEEN.Tween(from)
                    .to(to, 1000)
                    .easing(TWEEN.Easing.Sinusoidal.InOut)
                    .onUpdate(function () {
                        triangleGroup.rotation.set(this.x, this.y, this.z);
                        scene.rotation.y = this.scene;

                        if (window.innerWidth > 720){
                            material1.opacity = this.opacity;
                            material2.opacity = this.opacity;
                            material3.opacity = this.opacity;
                            material4.opacity = this.opacity;
                            material5.opacity = this.opacity;
                            triangleMaterial.opacity = this.opacity;
                            $("#curious-text").css({'opacity': this.opacity});
                        }

                        windowResize.trigger();

                        //staticParticleMaterial.opacity = this.opacity;
                        //curiousMaterial.opacity = this.opacity;
                    })
                    .onComplete(function () {
                        $("#stats").html("Curious?");
                    }).start();

                var from = {
                    x: camera.position.x,
                    y: camera.position.y,
                    z: camera.position.z
                };

                var to = {
                    x: 0,
                    y: 0,
                    z: 1750
                };

                var tween = new TWEEN.Tween(from)
                    .to(to, 1000)
                    .easing(TWEEN.Easing.Sinusoidal.InOut)
                    .onUpdate(function () {
                        camera.position.set(this.x, this.y, this.z);
                        camera.lookAt(new THREE.Vector3(0, 0, 0));
                        if( $("#home-overlay").is(":visible")  ) {
                            $("#home-overlay").fadeOut(500);
                        }
                        $(".tooltip").fadeOut(500);
                    })
                    .onComplete(function () {
                        camera.lookAt(new THREE.Vector3(0, 0, 0));
                        $("#home-overlay").css("display","none");

                        if(!$("#menu").hasClass("open") && !$(".modal-contain").hasClass("open")){
                            $("html").removeClass("noscroll");
                            $("body").removeClass("noscroll");
                            $("#container").removeClass("back");
                        }
                        console.log("data viz front side");
                    }).start();
            }

            function onWindowResize() {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize( window.innerWidth, window.innerHeight );
            }

            function render() {

                setTimeout(function(){
                    r = 800;
                    var geometry = pointCloud.geometry;
                    var attributes = geometry.attributes;
                    var color = new THREE.Color();
                    var convertedColor;
                    raycaster.setFromCamera( mouse, camera );
                    intersects = raycaster.intersectObject( pointCloud );
                    //curiousIntersect = raycaster.intersectObject( curiousMesh );

                    if($("#container").hasClass("back")){

                        if ( intersects.length > 0 ) {
                            if ( INTERSECTED != intersects[ 0 ].index ) {
                                //console.log("HIT!");
                                attributes.size.array[ INTERSECTED ] = PARTICLE_SIZE;
                                INTERSECTED = intersects[ 0 ].index;
                                attributes.size.array[ INTERSECTED ] = PARTICLE_SIZE * 1.75;
                                color.r = attributes.customColor.array[ INTERSECTED * 3];
                                color.g = attributes.customColor.array[ INTERSECTED * 3 + 1];
                                color.b = attributes.customColor.array[ INTERSECTED * 3 + 2];

                                convertedColor = color.getHexString();

                                attributes.size.needsUpdate = true;
                                $("#container").css({'cursor': 'pointer !important'});

                                switch(convertedColor){
                                    case ("ac4329"):
                                        generateToolTip("The Bigwigs", "Our fearless leaders and big cheeses");
                                        break;
                                    case ("fc8535"):
                                        generateToolTip("Analytics", "Where numbers become know-how");
                                        break;
                                    case ("f7f0d3"):
                                        generateToolTip("Project Management", "Keeping our timelines in line");
                                        break;
                                    case ("d24040"):
                                        generateToolTip("Production", 'They always “know a guy"');
                                        break;
                                    case ("a5bf6d"):
                                        generateToolTip("Strategy", "Keeping our timelines in line");
                                        break;
                                    case ("569ab3"):
                                        generateToolTip("Technology", "Inventors, tinkerers, makers of magical things");
                                        break;
                                    case ("b8520d"):
                                        generateToolTip("Account Management", "Fluent in both Client and Agency");
                                        break;
                                }


                            }
                        } else if ( INTERSECTED !== null ) {
                            attributes.size.array[ INTERSECTED ] = PARTICLE_SIZE;
                            attributes.size.needsUpdate = true;
                            INTERSECTED = null;
                            $("#container").css({'cursor': 'auto'});
                        }

                        /* if ( curiousIntersect.length > 0 ) {
                         var intersect = curiousIntersect[0];
                         if ( intersect.object != this.plane ) {
                         //console.log(intersect.object.material.color);
                         intersect.object.material.color = {r: 255, g: 255, b: 255};
                         //console.log("hover color");
                         document.getElementById("container").style.cursor = "pointer";
                         }
                         } else {
                         //var intersect = curiousIntersect[0];
                         //intersect.object.material.color = {r: 1, g: 1, b: 1};
                         curiousMesh.material.color = {r: 1, g: 1, b: 1};
                         document.getElementById("container").style.cursor = "auto";
                         } */
                    }


                }, 2000);

                function generateToolTip(d, c){
                    var tooltip = $(".tooltip"),
                        department = tooltip.find(".department"),
                        text = tooltip.find(".text");

                    tooltip.fadeOut("fast", function(){
                        department.text(d);
                        text.text(c);
                        tooltip.css("display", "flex").hide().fadeIn("slow");
                    });
                }

                renderer.render( scene, camera );

            }

        });

    }

        /* Home */
        if($("#home").length){

            console.log("The Abundancy / Home");

            var modal = $(".modal");

            // Background flying triangles
            if(isMobile.any() == null) {
                $(".triangle").each(function(){
                    var triangle = $(this),
                        randomDecimal = generateDecimal();

                    TweenMax.set(triangle,{ top: generateStringPercentage(), left: generateStringPercentage(), scale:randomDecimal} );

                    var bezier_path = [{ top: generateStringPercentage(), left: generateStringPercentage() }, { top: generateStringPercentage(), left: generateStringPercentage() }, { top: generateStringPercentage(), left: generateStringPercentage() }];

                    TweenMax.to(triangle, 50, { bezier: { type: 'thru', values: bezier_path,curviness: 1, autoRotate: true}, ease: Power1.easeInOut, yoyo: true, repeat:-1});

                });
            }

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
                $("header").removeClass("headroom--pinned").addClass("headroom--unpinned");
                $("html").addClass("noscroll");
                console.log("modal open");
            });

            // Modal close button
            $(".modal-button").on("click", function(){
                $(".modal-contain").toggleClass("open");
                $(".modal").toggleClass("animated fadeInUp");
                $("html").removeClass("noscroll");
                console.log("modal closed");
            });

            $(".modal-contain").on("click", function(){
                $(".modal-contain").toggleClass("open");
                $(".modal").toggleClass("animated fadeInUp");
                $("html").removeClass("noscroll");
                console.log("modal closed");
            }).children().click(function(e) {
                return false;
            });

            $(document).keydown(function(e) {
                if (e.keyCode === 27) {
                    if($(".modal-contain").hasClass("open")){
                        $(".modal-contain").toggleClass("open");
                        $(".modal").toggleClass("animated fadeInUp");
                        $("html").removeClass("noscroll");
                    }
                }

            });

            // Animate Get Chosen text

            function animateGetChosen() {

                if ($(window).width() > 680) {

                    var distanceFromTop = $(".parallax .small").offset().top - $(window).scrollTop();

                    var totalDistanceTraveled = totalDistanceNeededToTravel - (chosenLarge.offset().top - chosenSmall.offset().top),
                        percentageTraveled = totalDistanceTraveled / totalDistanceNeededToTravel;

                    if(distanceFromTop < 450 && !chosenSmall.hasClass("complete")){

                        var distanceTopDifference = (450 - distanceFromTop);

                        var fontSize = 18 + ((60 - 18) * percentageTraveled);

                        if (distanceFromTop < 75) {

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
                            }, 250);

                            setTimeout(function(){
                                $(".clients ul").addClass("animated fadeIn");
                            }, 500);

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

                    } else if (distanceFromTop > 450 && !chosenSmall.hasClass("complete")) {

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

            function elementInViewport(el) {
                var top = el.offsetTop;
                var left = el.offsetLeft;
                var width = el.offsetWidth;
                var height = el.offsetHeight;

                while(el.offsetParent) {
                    el = el.offsetParent;
                    top += el.offsetTop;
                    left += el.offsetLeft;
                }

                return (
                    top < (window.pageYOffset + window.innerHeight) &&
                    left < (window.pageXOffset + window.innerWidth) &&
                    (top + height) > window.pageYOffset &&
                    (left + width) > window.pageXOffset
                );
            }

            function primaryLogoLogic(){
                if(elementInViewport(document.getElementById("container"))){
                    $("#theabundancy").fadeOut();
                } else {
                    $("#theabundancy").fadeIn();
                }
            }

            function initHome(){
                animateGetChosen();
            }

            if(isMobile.any() == null) {
                var chosenSmall = $("#get-chosen-small"),
                    chosenLarge = $("#get-chosen-large");

                var totalDistanceNeededToTravel = chosenLarge.offset().top - chosenSmall.offset().top;
                var totalLeftDistanceNeededToTravel = chosenSmall.offset().left - chosenLarge.offset().left;

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

            $(window).scroll(function() {
                primaryLogoLogic();
            });

            $("#theabundancy").css({'display':'none'});
            primaryLogoLogic();

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

                    var imageCount = 0;

                    for( num in data.data ){
                        if (imageCount >= 8){
                            break;
                        }
                        if (data.data[num].type != 'video'){
                            $('.instagram-feed').append('<div class="box"><img src="'+data.data[num].images.standard_resolution.url+'"><a class="insta-overlay" href="'+ data.data[num].link +'" target="_blank"><div class="insta-heart">'+ data.data[num].likes.count + '</div><div class="insta-comments">'+ data.data[num].comments.count + '</div></a></div>');
                            imageCount++;
                        }
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

            $('.dropdown').fancySelect().on('change.fs', function() {
                $(this).trigger('update.fs');
            });

            $("#contact-us-form").submit(function(e){
                e.preventDefault();

                var name = $("#name-input").val(),
                    email = $("#email-input").val(),
                    subject = $("#input-subject").val(),
                    iama = $("#input-iama").val(),
                    message = $("#contact-message").val();

                var errors = [];

                if (($.trim(name) == '')){
                    console.log(name);
                    errors.push("name");
                }

                if (!validateEmail($.trim(email))){
                    console.log(email);
                    errors.push("email");
                }

                if (($.trim(message) == '')){
                    console.log(message);
                    errors.push("message");
                }

                console.log(errors);

                if (errors.length > 0){

                    if(errors.length == 1){
                        $(".error-overlay .message").text("Oops! Missed your " + errors[0] + ".");
                    }

                    if(errors.length == 2){
                        $(".error-overlay .message").text("Oops! Missed your " + errors.join(" and ") + ".");
                    }

                    if(errors.length > 2){
                        $(".error-overlay .message").text("Oops! Missed your name, email and message.");
                    }

                    $(".error-overlay").addClass("animated fadeIn active");

                } else {

                    $.ajax({
                        type: "POST",
                        url: "/contact",
                        data: $("#contact-us-form").serialize(),
                        cache: false,
                        success: function(result){
                            console.log(result);
                        }
                    });

                    $(':input','#contact-us-form')
                        .not(':button, :submit, :reset, :hidden')
                        .val('')
                        .removeAttr('checked')
                        .removeAttr('selected')
                        .prop( "disabled", true )
                        .trigger("change");

                    $("span.input").removeClass("input-filled").css("opacity", "0.5");
                    $(".dropdown").trigger('disable');

                    $("#contact-message, #contact-submit").remove();
                    $(".success-overlay").addClass("animated fadeIn active");

                }
            });

            $(".error-overlay").on("click", function(){
                $(this).removeClass("animated fadeInUp active");
            });

            function validateEmail(email) {
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email);
            }

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

        if($("#holiday_2016").length){

            $(".overlay").click(function(){
                var modalContain = $(".modal-contain");
                var image = $(this).find(".enlarge").attr("data-image");
                var count = $(this).find(".enlarge").attr("data-count");

                modalContain
                    .find("#card")
                    .attr("src", "/images/holiday-2016/" + image)
                    .attr("data-count", count)
                    .toggleClass("animated fadeInUp");

                modalContain.toggleClass("open");
                $("header").removeClass("headroom--pinned").addClass("headroom--unpinned");
                $("html").addClass("noscroll");
                setTimeout(function(){
                    modalContain.removeClass("animated");
                    modalContain.removeClass("fadeInUp");
                }, 1000);
            });

            $(".modal-contain .close, .modal-contain").on("click", function(){
                var modalContain = $(".modal-contain");
                modalContain.toggleClass("open");
                modalContain.find("#card").toggleClass("animated fadeInUp");
                $("html").removeClass("noscroll");
                console.log("modal closed");
            }).children().click(function(e) {
                return false;
            });

            $(".left").click(function(){
                if($(".modal-contain").hasClass("open")){
                    var currentCount = $(".modal-contain").find("#card").attr("data-count"),
                        nextCount = (currentCount > 1) ? (parseInt(currentCount) - 1) : 9;

                    var nextSlideImage = $("a[data-count='" + nextCount + "']").attr("data-image");


                    $(".modal-contain")
                        .find("#card")
                        .hide()
                        .attr("src", "/images/holiday-2016/" + nextSlideImage)
                        .attr("data-count", nextCount)
                        .fadeIn();
                }
            });

            $(".right").click(function(){
                if($(".modal-contain").hasClass("open")){
                    var currentCount = $(".modal-contain").find("#card").attr("data-count"),
                        nextCount = (currentCount < 9) ? (parseInt(currentCount) + 1) : 1;

                    var nextSlideImage = $("a[data-count='" + nextCount + "']").attr("data-image");


                    $(".modal-contain")
                        .find("#card")
                        .hide()
                        .attr("src", "/images/holiday-2016/" + nextSlideImage)
                        .attr("data-count", nextCount)
                        .fadeIn();
                }
            });

            $(".center").click(function(){
                if($(".modal-contain").hasClass("open")){
                    $(".modal-contain").toggleClass("open");
                    $("html").removeClass("noscroll")
                }
            });

            $(document).keydown(function(e) {
                switch(e.which) {
                    case 37: // left
                        $(".left").trigger("click");
                        break;

                    case 39: // right
                        $(".right").trigger("click");
                        break;

                    case 27:
                        $(".center").trigger("click");
                        break;
                    default: return; // exit this handler for other keys
                }
                e.preventDefault(); // prevent the default action (scroll / move caret)
            });

        }

})();
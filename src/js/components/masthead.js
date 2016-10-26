
$("#home-first").css("top", window.innerHeight+"px");
$("#home-first").css("height", window.innerHeight+"px");

$("#home-second").css("top", (window.innerHeight*2)+"px");
$("#home-second").css("height", window.innerHeight+"px");

$("#masthead").css("height", window.innerHeight+"px");
$("body").css("height", window.innerHeight+"px");

// Loader Load

function preLoader() {
    var group;
    var container, controls, stats;
    var camera, scene, renderer;

    var r = 800;
    var rHalf = r / 2;

    preLoadInit();
    preLoadAnimate();

    function preLoadInit() {

        container = document.getElementById( 'loader' );

        camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 4000 );
        camera.position.z = 1750;

        controls = new THREE.OrbitControls( camera, container );

        scene = new THREE.Scene();
        scene.background = new THREE.Color( 0x999999 );

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
        var basicMaterial = new THREE.MeshBasicMaterial( {side: THREE.DoubleSide, wireframe: true, color: 0xc65027, alphaTest:0.1, wireframeLinewidth: 8, transparent: true } );

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
        renderer.setClearColor(0x000000, 0);
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

    }

    function preLoadRender() {

        var time = Date.now() * 0.001;
        scene.rotation.y = time * 0.5;
        renderer.render( scene, camera );

    }

}
preLoader();

// Page Load

var firstPromise = $.getJSON("http://windev.fq540.com:8001/api/departments");
var secondPromise = $.getJSON("http://www.mocky.io/v2/5810fba43a0000650860988a");

firstPromise.done(function(response) {

    console.log(response);

    secondPromise.done(function(temperature){

        console.log(temperature);

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
                departments.push(val);
            }
            //console.log(key);
        });

        departments.push(creativeDept);
        departments.push(transparentDept);

        //console.log(departments);

        $("#loader").fadeOut();
        $("#scroll-down").fadeIn(2000);

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
            minDistance: 50,
            limitConnections: true,
            maxConnections: 1,
            particleCount: 0
        };

        var canvas1, context1, texture1, material1,
            canvas2, context2, texture2, material2,
            canvas3, context3, texture3, material3,
            canvas4, context4, texture4, material4,
            canvas5, context5, texture5, material5;

        var triangleMaterial;
        var triangleGroup = new THREE.Group();

        var PARTICLE_SIZE = 56;
        var raycaster, intersects;
        var mouse, INTERSECTED;


        //console.log("Particle Count: " + particleCount);

        $("#loader").promise().done(function() {
            init();
            animate();
        });

        function init() {

            container = document.getElementById('container');

            //

            camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 4000 );
            camera.position.z = 1750;

            controls = new THREE.OrbitControls( camera, container );

            scene = new THREE.Scene();
            scene.background = new THREE.Color( 0x4b3024 );

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
            triangleMaterial = new THREE.MeshBasicMaterial( {side: THREE.DoubleSide, wireframe: true, color: 0xc65027, alphaTest:0.1, wireframeLinewidth: 3, transparent: true } );

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
            triangleGroup.position.set(-200,350,0);
            triangleGroup.rotation.x = 0.35;
            triangleGroup.rotation.y = 0.05;
            triangleGroup.rotation.z = -0.01;

            scene.add(triangleGroup);






            // TEXT
            canvas1 = document.createElement('canvas');
            canvas1.needsUpdate = true;
            canvas1.width = 1200;

            canvas2 = document.createElement('canvas');
            canvas2.needsUpdate = true;
            canvas2.width = 830;

            canvas3 = document.createElement('canvas');
            canvas3.needsUpdate = true;
            canvas3.width = 560;

            canvas4 = document.createElement('canvas');
            canvas4.needsUpdate = true;
            canvas4.width = 150;

            canvas5 = document.createElement('canvas');
            canvas5.needsUpdate = true;
            canvas5.width = 350;

            context1 = canvas1.getContext('2d');
            context1.font = "Bold 72px Futura";
            context1.fillStyle = "rgba(255,255,255,1)";
            var ctext = "WHAT A BEAUTIFUL VARIETY.".split("").join(String.fromCharCode(8202))
            context1.fillText(ctext, 0, 80);

            context2 = canvas2.getContext('2d');
            context2.font = "Normal 42px Futura";
            context2.fillStyle = "rgba(255,255,200,1)";
            ctext = "WE'RE REINVENTING MARKETING".split("").join(String.fromCharCode(8202))
            context2.fillText(ctext, 0, 40);

            context3 = canvas3.getContext('2d');
            context3.font = "Normal 42px Futura";
            context3.fillStyle = "rgba(255,255,200,1)";
            ctext = "FOR MODERN CLIENTS".split("").join(String.fromCharCode(8202))
            context3.fillText(ctext, 0, 40);

            context4 = canvas4.getContext('2d');
            context4.font = "Normal 56px Futura LT Pro";
            context4.fillStyle = "rgba(255,255,255,1)";
            context4.fillText("THE", 0, 64);

            context5 = canvas5.getContext('2d');
            context5.font = "Normal 56px Futura LT Pro";
            context5.fillStyle = "rgba(255,255,255,1)";
            context5.fillText("ABUNDANCY", 0, 64);

            texture1 = new THREE.Texture( canvas1 )
            texture1.needsUpdate = true;
            texture1.minFilter = THREE.LinearFilter

            texture2 = new THREE.Texture( canvas2 )
            texture2.needsUpdate = true;
            texture2.minFilter = THREE.LinearFilter

            texture3 = new THREE.Texture( canvas3 )
            texture3.needsUpdate = true;
            texture3.minFilter = THREE.LinearFilter

            texture4 = new THREE.Texture( canvas4 )
            texture4.needsUpdate = true;
            texture4.minFilter = THREE.LinearFilter

            texture5 = new THREE.Texture( canvas5 )
            texture5.needsUpdate = true;
            texture5.minFilter = THREE.LinearFilter

            material1 = new THREE.MeshBasicMaterial( { map: texture1, color: 0xFFFFFF, transparent: true, opacity: 1, side: THREE.DoubleSide, alphaTest: 0.5 });
            material1.needsUpdate = true;

            material2 = new THREE.MeshBasicMaterial( { map: texture2, color: 0xFFFFFF, transparent: true, opacity: 1, side: THREE.DoubleSide, alphaTest: 0.5 });
            material2.needsUpdate = true;

            material3 = new THREE.MeshBasicMaterial( { map: texture3, color: 0xFFFFFF, transparent: true, opacity: 1, side: THREE.DoubleSide, alphaTest: 0.5 });
            material3.needsUpdate = true;

            material4 = new THREE.MeshBasicMaterial( { map: texture4, color: 0xFFFFFF, transparent: true, opacity: 1, side: THREE.DoubleSide, alphaTest: 0.5 });
            material3.needsUpdate = true;

            material5 = new THREE.MeshBasicMaterial( { map: texture5, color: 0xFFFFFF, transparent: true, opacity: 1, side: THREE.DoubleSide, alphaTest: 0.5 });
            material3.needsUpdate = true;

            var mesh1 = new THREE.Mesh( new THREE.PlaneGeometry(canvas1.width, canvas1.height), material1 );
            mesh1.position.set(0,0,0);
            mesh1.needsUpdate = true;
            mesh1.name = "Title";

            var mesh2 = new THREE.Mesh( new THREE.PlaneGeometry(canvas2.width, canvas2.height), material2 );
            mesh2.position.set(0,-220,0);
            mesh2.needsUpdate = true;

            var mesh3 = new THREE.Mesh( new THREE.PlaneGeometry(canvas3.width, canvas3.height), material3 );
            mesh3.position.set(0,-280,0);
            mesh3.needsUpdate = true;

            var mesh4 = new THREE.Mesh( new THREE.PlaneGeometry(canvas4.width, canvas4.height), material4 );
            mesh4.position.set(-40,325,0);
            mesh4.needsUpdate = true;

            var mesh5 = new THREE.Mesh( new THREE.PlaneGeometry(canvas5.width, canvas5.height), material5 );
            mesh5.position.set(55,265,0);
            mesh5.needsUpdate = true;

            scene.add( mesh1 );
            scene.add( mesh2 );
            scene.add( mesh3 );
            scene.add( mesh4 );
            scene.add( mesh5 );

            // PARTICLES
            var segments = maxParticleCount * maxParticleCount;

            positions = new Float32Array( segments * 3 );
            colors = new Float32Array( segments * 3 );

            uniforms = {
                color:     { value: new THREE.Color( 0xFFFFFF ) },
                texture:   { value: new THREE.TextureLoader().load( "images/ball.png" ) }
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
                [ (hslDegree*2), 1.0, 0.5 ],    // #FF0900 // bright red
                [ (hslDegree*200), 1.0, 0.5 ],	  // #00a8ff // bright blue
                [ (hslDegree*55), 1.0, 0.5 ],			// #ffea00 // bright yellow
                [ (hslDegree*33), 1.0, 0.56 ], 		// #ff9b21 // orange
                [ (hslDegree*166), 0.8, 0.72 ], 	// #aac3bd // light blue
                [ (hslDegree*61), 0.80, 0.90 ], 	// #f9fad2 // light yellow
                [ (hslDegree*39), 1.0, 0.66 ], 		// #ffc151 // gold
                [ (hslDegree*12), 0.58, 0.17 ], 	// #441c12 // red/brown
                [ (hslDegree*16), 0.67, 0.46 ] 		// #c65227 // copper
            ]

            // Joe Added
            for (var x = 1; x <= 9; x++){
                segmentArray.push(departments[x] + segmentCount);
                segmentCount += departments[x];
            }


            //console.log(pColors.length);

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

                particleColor[ i * 3     ] = color.r;
                particleColor[ i * 3 + 1 ] = color.g;
                particleColor[ i * 3 + 2 ] = color.b;

                particleSizes[ i ] = 56;

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

            //console.log(particles.toJSON());

            // create the particle system
            pointCloud = new THREE.Points( particles, pMaterial );
            group.add( pointCloud );

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

            renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
            renderer.setPixelRatio( window.devicePixelRatio );
            renderer.setSize( window.innerWidth, window.innerHeight );
            renderer.setClearColor(0x4b3024, 1);

            renderer.gammaInput = false;
            renderer.gammaOutput = false;

            container.appendChild( renderer.domElement );

            //

            raycaster = new THREE.Raycaster();
            mouse = new THREE.Vector2();
            raycaster.params.Points.threshold = 10;

            //

            document.addEventListener( 'mousemove', onDocumentMouseMove, false );
            document.addEventListener('mouseup', stopDrag, false);
            document.addEventListener('mousedown', startDrag, false);
            window.addEventListener( 'resize', onWindowResize, false );

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

        $("#stats").on("click",function(){

            var from = {
                x: camera.position.x,
                y: camera.position.y,
                z: camera.position.z
            };

            var to = {
                x: 900,
                y: 200,
                z: 900
            };

            var tween = new TWEEN.Tween(from)
                .to(to, 1000)
                .easing(TWEEN.Easing.Sinusoidal.InOut)
                .onUpdate(function () {
                    camera.position.set(this.x, this.y, this.z);
                    camera.lookAt(new THREE.Vector3(0, 0, 0));
                })
                .onComplete(function () {
                    camera.lookAt(new THREE.Vector3(0, 0, 0));
                    $("#stats").html("Total Departments: " + departments.length + "<br />Employees: " + particleCount + "<br />Date: " + temperature[0] + "<br />Time: " + temperature[1] + "<br />Temp: " + temperature[2] );

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

        });

        function onDocumentMouseMove( event ) {
            event.preventDefault();
            mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
            mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

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

            var from = {
                x: triangleGroup.rotation.x,
                y: triangleGroup.rotation.y,
                z: triangleGroup.rotation.z
            };

            var to = {
                x: 0.35,
                y: 0.05,
                z: -0.01
            };

            var tween = new TWEEN.Tween(from)
                .to(to, 1000)
                .easing(TWEEN.Easing.Sinusoidal.InOut)
                .onUpdate(function () {
                    triangleGroup.rotation.set(this.x, this.y, this.z);
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
                })
                .onComplete(function () {
                    $("#scroll-down").fadeIn();
                    camera.lookAt(new THREE.Vector3(0, 0, 0));
                    $("#stats").html("Curious?");

                }).start();

        }

        function onWindowResize() {

            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();

            renderer.setSize( window.innerWidth, window.innerHeight );

        }

        //

        function render() {

            setTimeout(function(){

                r = 800;

                var geometry = pointCloud.geometry;
                var attributes = geometry.attributes;

                raycaster.setFromCamera( mouse, camera );
                intersects = raycaster.intersectObject( pointCloud );

                if ( intersects.length > 0 ) {

                    if ( INTERSECTED != intersects[ 0 ].index ) {

                        console.log("HIT!");
                        //console.log(attributes.name);

                        attributes.size.array[ INTERSECTED ] = PARTICLE_SIZE;

                        INTERSECTED = intersects[ 0 ].index;

                        attributes.size.array[ INTERSECTED ] = PARTICLE_SIZE * 1.75;
                        attributes.size.needsUpdate = true;

                    }

                } else if ( INTERSECTED !== null ) {

                    attributes.size.array[ INTERSECTED ] = PARTICLE_SIZE;
                    attributes.size.needsUpdate = true;
                    INTERSECTED = null;

                }

            }, 2000);

            renderer.render( scene, camera );

        }

        //

        var $window = $(window);
        $window.on('scroll', scrollPage);

        function scrollPage(){
            //console.log("scrolling: " + $(document).scrollTop() );
            var factor = ($(document).scrollTop()*10);

            camera.position.z = (1750-factor);
            material1.opacity = (1-(factor/1000));
            material2.opacity = (1-(factor/1000));
            material3.opacity = (1-(factor/1000));
            material4.opacity = (1-(factor/1000));
            material5.opacity = (1-(factor/1000));
            triangleMaterial.opacity = (1-(factor/1000));

            $("#scroll-down").css( 'opacity', (1-(factor/1000)) );
            //Flip at 178

        }

        $("#scroll-down").click(function() {
            //$('html,body').animate({ scrollTop: ($("#home-first").offset().top-100)}, 4000);
        });

    });
});

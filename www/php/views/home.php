<?php include 'header.php'; ?>
<div id="container"></div>
<div id="home">
    <div class="parallax" id="intro">
        <div class="container">
            <div class="text-block-one">
                <span class="medium">We combine</span>
                <span class="large">
                    Creative<br />
                    Technology<br />
                    &amp; Analytics<br />
                </span>
                <span class="small">to create custom solutions that help brands <span i>get chosen.</span></span>
            </div>
            <div class="get-chosen">Get chosen<span>.</span></div>
            <section class="clients">
                <ul>
                    <li><a href="#"><img src="images/home/clients/uscellular.png"  width="123" alt="U.S. Cellular"></a></li>
                    <li><a href="#"><img src="images/home/clients/lincoln_park_zoo.png" width="113" alt="Lincoln Park Zoo"></a></li>
                    <li><a href="#"><img src="images/home/clients/sunpower.png" width="141" alt="Sun Power"></a></li>
                    <li><a href="#"><img src="images/home/clients/ulta.png" width="81" alt="Ulta"></a></li>
                    <li><a href="#"><img src="images/home/clients/mead_johnson.png" width="145" alt="Mead Johnson"></a></li>
                    <li><a href="#"><img src="images/home/clients/conagra.png" width="92" alt="ConAgra Foods"></a></li>
                    <li><a href="#"><img src="images/home/clients/jackson_hewitt.png" width="136" alt="Jackson Hewitt"></a></li>
                    <li><a href="#"><img src="images/home/clients/caterpillar.png" width="100" alt="Caterpillar"></a></li>
                </ul>
            </section>
        </div>
    </div>
    <section class="video">
        <h3>Here's a taste<span>.</span></h3>
        <div class='video-container'>
            <div class="video-object">
                <iframe src='https://player.vimeo.com/video/43417094' frameborder='0' webkitAllowFullScreen mozallowfullscreen allowFullScreen></iframe>
            </div>
        </div>
        <a href="/case-studies" class="btn home video-btn">See More Work</a>
    </section>
    <section class="leadership">
        <h3>Nice to meet you<span>.</span></h3>
        <ul>
            <li data-person="andrew_swinand">
                <div class="details">
                    <span class="name">Andrew Swinand</span>
                    <span class="title">CEO</span>
                </div>
                <img src="images/home/leadership/andrew_swinand.png">
            </li>
            <li data-person="brenda_strong">
                <div class="details">
                    <span class="name">Brenda Strong</span>
                    <span class="title">Executive Director, Operations</span>
                </div>
                <img src="images/home/leadership/brenda_strong.png">
            </li>
            <li data-person="brain_schinazi">
                <div class="details">
                    <span class="name">Brian Schinazi</span>
                    <span class="title">CTO</span>
                </div>
                <img src="images/home/leadership/brian_schinazi.png">
            </li>
            <li data-person="bryan_simkins">
                <div class="details">
                    <span class="name">Bryan Simkins</span>
                    <span class="title">CTO</span>
                </div>
                <img src="images/home/leadership/bryan_simkins.png">
            </li>
            <li data-person="caitlin_winkworth">
                <div class="details">
                    <span class="name">Caitlin Winkworth</span>
                    <span class="title">Director of Analytics</span>
                </div>
                <img src="images/home/leadership/caitlin_winkworth.png">
            </li>
            <li data-person="chris_marshall">
                <div class="details">
                    <span class="name">Chris Marshall</span>
                    <span class="title">Analytics Products and Services</span>
                </div>
                <img src="images/home/leadership/chris_marshall.png">
            </li>
            <li data-person="david_brown">
                <div class="details">
                    <span class="name">David Brown</span>
                    <span class="title">President</span>
                </div>
                <img src="images/home/leadership/david_brown.png">
            </li>
            <li data-person="debbie_myszynski">
                <div class="details">
                    <span class="name">Debbie Myszynski</span>
                    <span class="title">Group Account Director</span>
                </div>
                <img src="images/home/leadership/deb_myszynski.png">
            </li>
            <li data-person="katie_newman">
                <div class="details">
                    <span class="name">Katie Newman</span>
                    <span class="title">CMO</span>
                </div>
                <img src="images/home/leadership/katie_newman.png">
            </li>
            <li data-person="larry_byrne">
                <div class="details">
                    <span class="name">Larry Byrne</span>
                    <span class="title">Executive Director, Production</span>
                </div>
                <img src="images/home/leadership/larry_byrne.png">
            </li>
            <li data-person="melissa_healy">
                <div class="details">
                    <span class="name">Melissa Healy</span>
                    <span class="title">Group Creative Director</span>
                </div>
                <img src="images/home/leadership/melissa_healy.png">
            </li>
            <li data-person="suzanna_michaels">
                <div class="details">
                    <span class="name">Suzanne Michaels</span>
                    <span class="title">Executive Creative Director</span>
                </div>
                <img src="images/home/leadership/suzanne_michaels.png">
            </li>
            <li data-person="stephanie_ridley">
                <div class="details">
                    <span class="name">Stephanie Ridley</span>
                    <span class="title">Marketing Technology Accounts</span>
                </div>
                <img src="images/home/leadership/stephanie_ridley.png">
            </li>
            <li data-person=tom_hack">
                <div class="details">
                    <span class="name">Tom Hack</span>
                    <span class="title">Director of Finance</span>
                </div>
                <img src="images/home/leadership/tom_hack.png">
            </li>
        </ul>
    </section>
</div>

<script type="x-shader/x-vertex" id="vertexshader">
    attribute float size;
    attribute vec3 customColor;
    varying vec3 vColor;
    void main() {
        vColor = customColor;
        vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
        gl_PointSize = size * ( 450.0 / -mvPosition.z );
        gl_Position = projectionMatrix * mvPosition;
    }
</script>
<script type="x-shader/x-fragment" id="fragmentshader">
    uniform vec3 color;
    uniform sampler2D texture;
    varying vec3 vColor;
    void main() {
        gl_FragColor = vec4( color * vColor, 1.0 );
        gl_FragColor = gl_FragColor * texture2D( texture, gl_PointCoord );
    }
</script>

<?php include 'footer.php' ?>
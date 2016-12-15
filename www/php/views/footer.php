<footer>
    <div class="contain">
        <a href="/">
            <img src="/images/the_abundancy-logo-w-text.png" id="footer-logo" alt="The Abundancy">
        </a>
        <div class="navigation">
            <a href="/approach">Our Approach</a> | <a href="/work">Our Work</a> | <a href="/culture">Our Culture</a> | <a href="/contact">Contact Us</a> |
            <a href="/contact#careers">Careers</a>
        </div>
        <div class="social">
            <a href="https://www.linkedin.com/company/10785212" target="_blank" class="linkedin"><span class="icon"></span></a>
            <a href="https://www.facebook.com/TheAbundancy/" target="_blank" class="facebook"><span class="icon"></span></a>
            <a href="https://twitter.com/theabundancy" target="_blank" class="twitter"><span class="icon"></span></a>
            <a href="https://www.instagram.com/theabundancy/" target="_blank" class="instagram"><span class="icon"></span></a>
        </div>
    </div>
    <div class="copyright">&copy; The Abundancy 2016</div>
</footer>

<!-- jQuery -->
<script src="https://code.jquery.com/jquery-3.1.1.min.js" integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=" crossorigin="anonymous"></script>
<script src="/js/libs/jquery.vticker.min.js"></script>

<!-- Addt'l Dependencies -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/tween.js/16.3.5/Tween.min.js"></script>
<script src="/js/libs/three.min.js"></script>
<script src="/js/libs/controls/OrbitControls.js"></script>
<script src="/js/libs/renderers/Projector.js"></script>
<script src="/js/libs/renderers/CanvasRenderer.js"></script>
<script src="/js/libs/renderers/threex.window.resize.js"></script>
<script src="/js/libs/classie.js"></script>
<script src="/js/libs/wow.min.js"></script>
<script src="/js/libs/fancySelect.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/1.19.0/TweenMax.min.js"></script>
<script src="https://npmcdn.com/headroom.js@0.9.3/dist/headroom.min.js"></script>
<!-- <script src="js/components/main.js"></script> -->

<!-- Main Script File -->

<script src="/js/app.js"></script>
<script>
    new WOW().init();
    var myElement = document.querySelector("header");
    // construct an instance of Headroom, passing the element
    var headroom  = new Headroom(myElement);
    // initialise
    headroom.init();
</script>
</body>
</html>

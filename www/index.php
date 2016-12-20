<?php

require __DIR__ . '/vendor/autoload.php';

//
//
//
// Initialize AltoRouter. Don't move.

$router = new AltoRouter();

//
// Home Page
//

$router->map( 'GET', '/', function() {
    $cssRoute = '/css/pages/home.css';
    require __DIR__ . '/php/views/index.php';
}, 'home');

//
// Our Approach Page
//

$router->map( 'GET', '/approach', function() {
    $cssRoute = '/css/pages/approach.css';
    require __DIR__ . '/php/views/approach.php';
}, 'approach');

//
// Our Work Page
//

$router->map( 'GET', '/work', function() {
    $cssRoute = '/css/pages/work.css';
    require __DIR__ . '/php/views/work.php';
}, 'cases');

$router->map( 'GET', '/work/us-cellular', function() {
    $cssRoute = '/css/pages/uscellular.css';
    require __DIR__ . '/php/views/uscellular.php';
}, 'uscellular');

$router->map( 'GET', '/work/ulta-beauty', function() {
    $cssRoute = '/css/pages/ulta.css';
    require __DIR__ . '/php/views/ulta.php';
}, 'ulta');

$router->map( 'GET', '/work/jackson-hewitt', function() {
    $cssRoute = '/css/pages/jacksonhewitt.css';
    require __DIR__ . '/php/views/jacksonhewitt.php';
}, 'jacksonhewitt');

$router->map( 'GET', '/work/sunpower', function() {
    $cssRoute = '/css/pages/sunpower.css';
    require __DIR__ . '/php/views/sunpower.php';
}, 'sunpower');


//
// Culture Page
//

$router->map( 'GET', '/culture', function() {
    $cssRoute = '/css/pages/culture.css';
    require __DIR__ . '/php/views/culture.php';
}, 'culture');


//
// Contact Page
//

$router->map( 'GET', '/contact', function() {
    $cssRoute = '/css/pages/contact.css';
    require __DIR__ . '/php/views/contact.php';
}, 'contact');

$router->map( 'POST', '/contact', function() {
    require __DIR__ . '/mail.php';
}, 'contactForm');

//
// Promotional Landing Pages
//

$router->map( 'GET', '/holiday-2016', function() {
    $cssRoute = '/css/pages/holiday2016.css';
    require __DIR__ . '/php/views/holiday2016.php';
}, 'holiday2016');

//
//
//
// Router matching and callback firing. Don't move.

$match = $router->match();

if( $match && is_callable( $match['target'] ) ) {
    call_user_func_array( $match['target'], $match['params'] );
} else {
    $cssRoute = '/css/pages/404.css';
    require __DIR__ . '/php/views/404.php';
}

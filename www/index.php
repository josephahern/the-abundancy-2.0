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
    require __DIR__ . '/php/views/index.php';
}, 'home');

//
// Our Approach Page
//

$router->map( 'GET', '/approach', function() {
    require __DIR__ . '/php/views/approach.php';
}, 'approach');

//
// Our Work Page
//

$router->map( 'GET', '/work', function() {
    require __DIR__ . '/php/views/work.php';
}, 'cases');

$router->map( 'GET', '/work/us-cellular', function() {
    require __DIR__ . '/php/views/uscellular.php';
}, 'uscellular');


//
// Culture Page
//

$router->map( 'GET', '/culture', function() {
    require __DIR__ . '/php/views/culture.php';
}, 'culture');


//
// Contact Page
//

$router->map( 'GET', '/contact', function() {
    require __DIR__ . '/php/views/contact.php';
}, 'contact');

//
//
//
// Router matching and callback firing. Don't move.

$match = $router->match();

if( $match && is_callable( $match['target'] ) ) {
    call_user_func_array( $match['target'], $match['params'] );
} else {
    // no route was matched
    header( $_SERVER["SERVER_PROTOCOL"] . ' 404 Not Found');
}

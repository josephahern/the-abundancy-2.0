<?php

require __DIR__ . '/vendor/autoload.php';

//
//
//
// Initialize AltoRouter. Don't move.

$router = new AltoRouter();

//
//
//
// Page title, meta and dependencies object (default)

$meta = new stdClass();
$meta->title = 'Get Chosen.';
$meta->description = 'We combine creative, technology & analytics to create custom solutions that help brands get chosen.';
$meta->customCss = '';

//
// Home Page
//

$router->map( 'GET', '/', function() {

    global $meta;

    $meta->customCss = '/css/pages/home.css';
    require __DIR__ . '/php/views/index.php';

}, 'home');

//
// Our Approach Page
//

$router->map( 'GET', '/approach', function() {

    global $meta;
    $meta->title = 'Our Approach';
    $meta->description = 'People can get exactly what they want — the only question is if they\'ll get it from you. We help brands matter to the right people in the right moments to get chosen.';
    $meta->customCss = '/css/pages/approach.css';

    require __DIR__ . '/php/views/approach.php';
}, 'approach');

//
// Our Work Page
//

$router->map( 'GET', '/work', function() {

    global $meta;
    $meta->title = 'Our Work';
    $meta->description = 'Here\'s the story.';
    $meta->customCss = '/css/pages/work.css';

    require __DIR__ . '/php/views/work.php';
}, 'cases');

$router->map( 'GET', '/work/us-cellular', function() {

    global $meta;
    $meta->title = 'U.S. Cellular Case Study';
    $meta->description = 'U.S. Cellular was competing with telecom companies that had louder voices and larger budgets. They called us to find a smarter way to attract people to their pre-paid services. We knew just the thing.';
    $meta->customCss = '/css/pages/uscellular.css';

    require __DIR__ . '/php/views/uscellular.php';
}, 'uscellular');

$router->map( 'GET', '/work/ulta-beauty', function() {

    global $meta;
    $meta->title = 'Ulta Beauty Case Study';
    $meta->description = 'There are almost 1 billion beauty video views on YouTube every month, but ULTA was missing out. They needed to catch the eyes of beauty viewers, and called on us to attract them.';
    $meta->customCss = '/css/pages/ulta.css';

    require __DIR__ . '/php/views/ulta.php';
}, 'ulta');

$router->map( 'GET', '/work/jackson-hewitt', function() {

    global $meta;
    $meta->title = 'Jackson Hewitt Case Study';
    $meta->description = 'Jackson Hewitt had a tax headache of their own. People were struggling to book appointments online and the company was losing leads and revenue. We had a way to get them to return.';
    $meta->customCss = '/css/pages/jacksonhewitt.css';

    require __DIR__ . '/php/views/jacksonhewitt.php';
}, 'jacksonhewitt');

$router->map( 'GET', '/work/sunpower', function() {

    global $meta;
    $meta->title = 'SunPower Case Study';
    $meta->description = 'SunPower makes the best solar panels on the market, but they were getting lost among low-price competitors. They asked us to help them shine for a more discerning audience and attract new dealers.';
    $meta->customCss = '/css/pages/sunpower.css';

    require __DIR__ . '/php/views/sunpower.php';
}, 'sunpower');


//
// Culture Page
//

$router->map( 'GET', '/culture', function() {

    global $meta;
    $meta->title = 'Our Culture';
    $meta->description = 'We are inventors.';
    $meta->customCss = '/css/pages/culture.css';

    require __DIR__ . '/php/views/culture.php';
}, 'culture');


//
// Contact Page
//

$router->map( 'GET', '/contact', function() {

    global $meta;
    $meta->title = 'Contact Us';
    $meta->description = 'Let\'s be friends.';
    $meta->customCss = '/css/pages/contact.css';

    require __DIR__ . '/php/views/contact.php';
}, 'contact');

$router->map( 'POST', '/contact', function() {
    require __DIR__ . '/mail.php';
}, 'contactForm');

//
// Promotional Landing Pages
//

$router->map( 'GET', '/holiday-2016', function() {

    global $meta;
    $meta->title = 'And to All, A Good Reply';
    $meta->description = 'To fill your Out of Office email with festive cheer, pick a message and drop it into the text field of your auto-reply message. Happy Holidays.';
    $meta->customCss = '/css/pages/holiday2016.css';

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

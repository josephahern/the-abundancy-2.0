<?php

require_once __DIR__ . '/vendor/autoload.php';

$routes = new \Klein\Klein();

$routes->respond('GET', '/hello-world', function () {
    return 'Hello World!';
});

$routes->dispatch();
<!DOCTYPE html>
<html lang="en">
<head>

    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <title>The Abundancy | <?php echo $meta->title ?></title>
    <meta name="description" content="<?php echo $meta->description; ?>">

    <!-- Web Fonts -->
    <link type="text/css" rel="stylesheet" href="//fast.fonts.net/cssapi/b8898fd3-6341-4d29-97da-84247416006a.css"/>
    <!-- Primary Stylesheet -->
    <link rel="stylesheet" href="/css/main.css">
    <!-- Secondary Stylesheet -->
    <?php
        if(!empty($meta->customCss)){
    ?>
    <link rel="stylesheet" href="<?php echo $meta->customCss; ?>">
    <?php
        }
    ?>
</head>
<body id="content">

<!-- Primary Navigation -->
<nav id="menu">
    <button class="close-button" id="close-button">Close Menu</button>
    <a href="/">HOME</a>
    <a href="/approach">OUR APPROACH</a>
    <a href="/work">OUR WORK</a>
    <a href="/culture">OUR CULTURE</a>
    <a href="/contact">CONTACT + CAREERS</a>
    <a href="/" id="menu-logo">
        <img src="/images/menu/theabundancy-logo.png" alt="The Abundancy">
    </a>
</nav>
<!-- end Primary Navigation -->

<header>
    <div class="home-logo">
        <a href="/" id="theabundancy"></a>
        <button class="menu-button" id="open-button"></button>
    </div>
</header>

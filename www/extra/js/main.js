/**
 * main.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Copyright 2014, Codrops
 * http://www.codrops.com
 */
(function() {

	var bodyEl = document.body,
		content = document.getElementById( 'container' ),
		openbtn = document.getElementById( 'open-button' ),
		closebtn = document.getElementById( 'close-button' ),
		isOpen = false;

	function init() {
		initEvents();
	}

	function initEvents() {
		openbtn.addEventListener( 'click', toggleMenu );
		if( closebtn ) {
			closebtn.addEventListener( 'click', toggleMenu );
		}

		// close the menu element if the target it´s not the menu element or one of its descendants..
		content.addEventListener( 'click', function(ev) {
			var target = ev.target;
			if( isOpen && target !== openbtn ) {
				toggleMenu();
			}
		} );
	}

	function toggleMenu() {
		if( isOpen ) {
			classie.remove( bodyEl, 'show-menu' );
			$(".menu-wrap").css("transform", "translate3d(" + (window.innerWidth+500) + "px," + ( $(document).scrollTop() ) + "px,0)");
		}
		else {
			classie.add( bodyEl, 'show-menu' );
			$(".show-menu .menu-wrap").css("transform", "translate3d(" + (window.innerWidth-320) + "px," + ( $(document).scrollTop() ) + "px,0)");
		}
		isOpen = !isOpen;
	}

	$(window).resize(function() {
		if( isOpen ) {
			$(".show-menu .menu-wrap").css("transform", "translate3d(" + (window.innerWidth-320) + "px,0,0)");
		}
		else {
			$(".menu-wrap").css("transform", "translate3d(" + (window.innerWidth+500) + "px,0,0)");
		}
	});

	$(window).scroll(function() {
		if( isOpen ) {
			classie.remove( bodyEl, 'show-menu' );
			isOpen = !isOpen;
		}

		$(".menu-wrap").css("transform", "translate3d(" + (window.innerWidth+500) + "px," + ( $(document).scrollTop() ) + "px,0)");

	});


	init();


})();

!function(){function t(){if($(window).width()>680){var t=$(".parallax .small").offset().top-$(window).scrollTop(),e=f-(d.offset().top-u.offset().top),n=e/f;if(t<350&&!u.hasClass("complete")){var a=350-t,o=18+42*n;if(t<-40)u.css({color:"#F8F9D2",top:f+14,left:-p,fontSize:"60px",lineHeight:"60px",transition:"all 0.4s ease"}),u.find("span").css({color:"#C55227",fontSize:"60px",lineHeight:"60px"}),u.addClass("complete"),setTimeout(function(){u.hide(),d.css({opacity:1}),$(".btn.home.parallax-btn").addClass("animated fadeIn")},500),setTimeout(function(){$(".clients ul").addClass("animated fadeIn")},1e3);else{var i=-(p*n);u.css({top:a,left:i,fontSize:o+"px",lineHeight:o+"px"})}}else t>350&&!u.hasClass("complete")&&u.css({color:"#DDDDDC",top:0,left:0,fontSize:"18px",lineHeight:"18px"})}}function e(){var t=0,e=100,n=Math.floor(Math.random()*(e-t+1)+t).toString()+"%";return n}function n(){return Math.random().toFixed(2)}function a(){t()}function o(){i("#Layer_8 #line-8-1",0,2,"ease-in-out"),i("#Layer_8 #line-8-2",1900,.5,"linear"),i("#Layer_8 #line-8-3",1900,.5,"linear")}function i(t,e,n,a){var o=document.querySelector(t),i=o.getTotalLength();o.style.transition=o.style.WebkitTransition="none",o.style.strokeDasharray=i+" "+i,o.style.strokeDashoffset=i,o.getBoundingClientRect(),o.style.transition=o.style.WebkitTransition="stroke-dashoffset "+n+"s "+a,setTimeout(function(){o.style.strokeDashoffset="0"},e)}var l={Android:function(){return navigator.userAgent.match(/Android/i)},BlackBerry:function(){return navigator.userAgent.match(/BlackBerry/i)},iOS:function(){return navigator.userAgent.match(/iPhone|iPad|iPod/i)},Opera:function(){return navigator.userAgent.match(/Opera Mini/i)},Windows:function(){return navigator.userAgent.match(/IEMobile/i)||navigator.userAgent.match(/WPDesktop/i)},any:function(){return l.Android()||l.BlackBerry()||l.iOS()||l.Opera()||l.Windows()}};if(console.log(l.any()),$("#menu").length&&($(".menu-button").on("click",function(){$("#menu").toggleClass("open"),$("header").toggleClass("headroom--pinned, headroom--unpinned")}),$(".close-button").on("click",function(){$("#menu").toggleClass("open")})),null==l.any()&&$(".vertical-title").length&&$(window).scroll(function(){$(".vertical-title").each(function(){var t=$(this).offset().top,e=t-$(window).scrollTop();e<375&&!$(this).hasClass("active")&&$(this).addClass("active")})}),null==l.any()&&$(".parallax").length){var s=document.querySelectorAll(".parallax"),r=.15;window.onscroll=function(){[].slice.call(s).forEach(function(t,e){var n=window.pageYOffset;t.style.backgroundPosition="0 "+n*r+"px"})}}if($("#shuffler").length&&$("#shuffler").slotMachine({active:1,delay:400,auto:1500,spins:2}),$("#home").length){console.log("The Abundancy / Home");var c=$(".modal");if(null==l.any()&&$(".triangle").each(function(){var t=$(this),a=n();TweenMax.set(t,{top:e(),left:e(),scale:a});var o=[{top:e(),left:e()},{top:e(),left:e()},{top:e(),left:e()}];TweenMax.to(t,50,{bezier:{type:"thru",values:o,curviness:1,autoRotate:!0},ease:Power1.easeInOut,yoyo:!0,repeat:-1})}),$(".leadership li").on("click",function(){var t=$(this).find(".modal-name").text(),e=$(this).find(".modal-title").text(),n=$(this).find(".modal-i_am_a").text(),a=$(this).find(".modal-bio").text();c.find(".name").text(t),c.find(".title").text(e),c.find(".i_am_a").text(n),c.find(".text").text(a),c.find("img").attr("src","images/home/leadership/gif/"+$(this).attr("data-person")+".gif"),$(".modal-contain").toggleClass("open"),c.toggleClass("animated fadeInUp"),$("html").addClass("noscroll")}),$(".modal-button").on("click",function(){$(".modal-contain").toggleClass("open"),$(".modal").toggleClass("animated fadeInUp"),$("html").removeClass("noscroll")}),$(".modal-contain").on("click",function(){$(".modal-contain").toggleClass("open"),$(".modal").toggleClass("animated fadeInUp"),$("html").removeClass("noscroll")}).children().click(function(t){return!1}),null==l.any()){var u=$("#get-chosen-small"),d=$("#get-chosen-large"),f=d.offset().top-u.offset().top,p=u.offset().left-d.offset().left;$(window).scroll(function(){t()}),$(window).resize(function(){t()}),a()}}if($("#approach").length&&(console.log("The Abundancy / Our Approach"),o(),setInterval(o(),6e3)),$("#cases").length&&console.log("The Abundancy / Our Work"),$("#culture").length){console.log("The Abundancy / Our Culture");var m="390074368.1439f97.94f68308db0542b1bd4fe81f4abac769",h=15;$.ajax({url:"https://api.instagram.com/v1/users/self/media/recent",dataType:"jsonp",type:"GET",data:{access_token:m,count:h},success:function(t){var e=0;for(num in t.data){if(e>=8)break;"video"!=t.data[num].type&&($(".instagram-feed").append('<div class="box"><img src="'+t.data[num].images.standard_resolution.url+'"><a class="insta-overlay" href="'+t.data[num].link+'" target="_blank"><div class="insta-heart">'+t.data[num].likes.count+'</div><div class="insta-comments">'+t.data[num].comments.count+"</div></a></div>"),e++)}},error:function(t){console.log(t)}}),setTimeout(function(){$("#bolt-lines").removeClass("bolt-before").addClass("bolt-after")},3e3)}$("#contact").length&&(console.log("The Abundancy / Contact + Careers"),$(".input-field").focus(function(){$(this).hasClass("input-filled")||$(this).parent().addClass("input-filled")}),$(".input-field").blur(function(){""===$(this).val()&&$(this).parent().removeClass("input-filled")}),$(".dropdown").fancySelect(),$("#contact-us-form").submit(function(t){t.preventDefault();var e=$("#input-name input").val(),n=$("#input-email input").val(),a=$("#input-subject").val(),o=$("#input-iama").val();alert("Name: "+e+" Email: "+n+" Subject: "+a+" I am a: "+o)}),$.ajax({url:"https://jsapi.recruiterbox.com/v1/openings?client_name=theabundancy",contentType:"application/json",success:function(t){for(var e=0;e<t.objects.length;e++){var n=t.objects[e],a='<li><div class="position">'+n.title+"<br />"+n.location.city+", "+n.location.state+", "+n.location.country+'</div><div class="type">'+n.position_type.replace(/[_-]/g," ")+'</div><a href="'+n.hosted_url+'" class="read-more" target="_blank">READ MORE</a></li>';$(".openings").append(a)}}}))}();
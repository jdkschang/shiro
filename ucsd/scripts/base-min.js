function initCopyright(){var a=new Date;copyrightYear=a.getFullYear(),$("#tdr_copyright_year").empty(),$("#tdr_copyright_year").append(copyrightYear)}function initFooter(a){a+=location.pathname;var b='<a href="';b+=a,b+='" onclick="window.open(\'',b+=a,b+="', 'DYGWYW', 'menubar=0,resizable=1,scrollbars=1,width=450,height=650');\" target=\"DYGWYW\">Feedback</a>",$("#tdr_footer_feedback").empty(),$("#tdr_footer_feedback").append(b)}function initLogout(a){var b="https://a4.ucsd.edu/tritON/resources/bugscript.jsp?target=https%3A%2F%2Fwww.ucsd.edu&jsoncallback=?";$.getJSON(b,function(b){if(b.eduUcsdActLoggedin){var c='<div id="tdr_login_content">You are logged in | <a href="https://act.ucsd.edu/security/logout?url=';c+=a,c+='">Log Out</a></div>',$("div#tdr_login").empty(),$("div#tdr_login").append(c)}})}$(document).ready(function(){function a(){f.width()>=c&&(b.hasClass("active")&&(b.removeClass("active"),$("#tdr_search_content>form").length||($(".nav-offcanvas>.tdr_search>form").appendTo($("#tdr_search_content")),$("#tdr_side_nav>.tdr_nav_list").prependTo("#tdr_nav_content"),i.superfish({cssArrows:!1}))),e.height()>d?b.addClass("collapse-nav"):b.removeClass("collapse-nav")),f.width()<c&&b.hasClass("collapse-nav")&&b.removeClass("collapse-nav")}var b=$("body"),c=768,d=38,e=$("#tdr_nav"),f=$(window),g=e.find(".tdr_search"),h=e.find(".btn-default"),i=$(".tdr_nav_list"),j=!1;i.find("> li").length>0&&(j=!0),j?i.superfish({cssArrows:!1}):($("#tdr_title_menu_link").attr("style","display: none"),$("#tdr_title_content").addClass("noMenu")),$("#tdr_search_toggle").click(function(){g.toggleClass("show")}),$("#tdr_search_toggle").click(function(){h.toggleClass("btn-s")}),$(".navbar-toggle").on("click",function(){b.toggleClass("active"),$("#tdr_search_content>form").length?($("#tdr_search_content>form").appendTo($(".nav-offcanvas>.tdr_search")),$("#tdr_nav .tdr_nav_list").appendTo("#tdr_side_nav")):($(".nav-offcanvas>.tdr_search>form").appendTo($("#tdr_search_content")),$("#tdr_side_nav>.tdr_nav_list").prependTo("#tdr_nav_content")),i.superfish({cssArrows:!1})}),f.on("load orientationchange resize",a)}),function(a){a(document).ready(function(){a(".flexslider").each(function(){var b=a(this),c=a(".flex-caption"),d={controlNav:!1,directionNav:!1,nextText:"&gt;",prevText:"&lt;"};b.has(".flex-controls").length>0&&(d=a.extend(d,{controlNav:!0,controlsContainer:".flex-controls",pausePlay:!0,slideshow:!0})),Modernizr.touch&&(d=a.extend(d,{animation:"slide"}),c.css({display:"block",padding:"10px",left:"auto",width:"inherit","box-sizing":"border-box","-moz-box-sizing":"border-box","-webkit-box-sizing":"border-box","z-index":"9"}),navigator.userAgent.match(/(iPad|iPhone|iPod)/g)&&(d=a.extend(d,{useCSS:!1,start:function(){c.css({padding:"2%"})},before:function(){c.css({width:"100%"})},after:function(){c.css({width:"inherit"})}}))),b.hasClass("alt")&&(d=a.extend(d,{directionNav:!0})),b.hasClass("noSlideShow")&&(d=a.extend(d,{controlNav:!1,slideshow:!1,directionNav:!0})),1==b.find("li").length&&(d=a.extend(d,{touch:!1,controlNav:!1,pausePlay:!1})),"function"==typeof blinkPausePlay&&blinkPausePlay(b,d),"function"!=typeof blinkPausePlay&&a(this).flexslider(d),Modernizr.touch&&b.has(".controls").length>0&&b.children(".controls").appendTo(b)})})}(jQuery),$(document).ready(function(){function a(a){a.children(".drawer").children("h2").addClass("expand"),a.children(".drawer").children("div").show()}function b(a){a.children(".drawer").children("h2").removeClass("expand"),a.children(".drawer").children("div").hide()}function c(a){a.find(".drawer-toggle a").each(function(){element=$(this),element.html(element.hasClass("expand")?"Collapse All":"Expand All"),element.toggleClass("expand")})}$(".drawer").each(function(){var d=$(this);d.wrap('<div class="drawer-wrapper"/>');var e=d.parent(),f='<div class=""></div>';e.prepend(f),e.append(f),d.children("div").toggle(),d.children("h2").click(function(){return $(this).toggleClass("expand"),$(this).next().toggle(),$(this).hasClass("expand")&&(window.location.hash=$(this).find("a").text().replace(/\s/g,"-").substring(0,31)),!1}),e.find(".drawer-toggle a").click(function(){return $(this).hasClass("expand")?a(e):b(e),c(e),window.history&&window.history.pushState?window.history.pushState("","",window.location.pathname):window.location.href=window.location.href.replace(/#.*$/,"#"),!1}),$(window).load(function(){d.children("h2").each(function(){if(window.location.hash=="#"+$(this).text().replace(/\s/g,"-").substring(0,31)){var a=$(this).offset();$(this).toggleClass("expand").next().toggle(),setTimeout(function(){window.scrollTo(0,a.top)},50)}})})})});
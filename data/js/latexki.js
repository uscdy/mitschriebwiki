$.extend($.fn.socialSharePrivacy.settings, {
    path_prefix: "/data/js/SocialSharePrivacy/",
    language: "de",
    title: "Mitschriebwiki",
    description: "Collaborative creation of lecture notes.", 
    uri: function() {return "http://mitschriebwiki.nomeata.de/" },
});


$(document).ready(function() {	
	$('.tocLink > a').toc({
	    'selectors': 'h2', //elements to use as headings
	    'container': '.page', //element to find all selectors in
	    'smoothScrolling': true, //enable or disable smooth scrolling on click
	    'prefix': 'toc', //prefix for anchor tags and class names
	    'onHighlight': function(el) {}, //called when a new section is highlighted 
	    'highlightOnScroll': true, //add class to heading that is currently in focus
	    'highlightOffset': 100, //offset to trigger the next headline
	    'anchorName': function(i, heading, prefix) { //custom function for anchor name
		return prefix+i;
	    },
	    'headerText': function(i, heading, $heading) { //custom function building the header-item text
	    	var header = $heading.text();
		if (header.length > 20) {
			var slices = header.substring(0,20).split(" ");
			if (slices.length > 1) {
				slices = slices.slice(0, -1);
			}
			return slices.join(" ") + "...";
		} else {
			return header;
		}
	    } 
	});

	$(".tocLink > a ul").hide();
	$(".tocLink > a").hover(function() { 
		$(".tocLink > a").toggleClass('active'); 
		$(".tocLink > a ul").stop().slideDown();
	}, function() {
		$(".tocLink > a").toggleClass('active'); 
		$(".tocLink > a ul").stop().slideUp();
	}).children().click(function(e) {
		  return false;
	});

});

$(document).ready(function(){
        $('#socialshareprivacy').socialSharePrivacy();
    });

// More/Less for lectures: insert button, hide .more, toggle .more/button 
$(document).ready(function() {
	$("h4").wrapInner('<button class="moreButton">');
	$(".more").hide();
	$("h4").click(function() { 
		var moreLess = $(this).next(".more").is(':visible') ? 'More' : 'Less';
		$(this).next(".more").slideToggle();
		$(this).children("button").text(moreLess);
	});
});

// open jqueryUI Dialog for Inhaltsverzeichnis 
  $('.openDialog').each(function() {  
    $.data(this, 'dialog',
      $(this).next('.dialogMessage').dialog({
	autoOpen: false,
	height: "auto",
	width: 500,
	modal: true
      })
    );  
  }).click(function() {  
      $.data(this, 'dialog').dialog('open');  
      return false;  
  }); 



// Lecture search
$(document).ready(function() {
	$("input.lectureSearch").show().bind('input',function() {
		var str = $("input.lectureSearch").val();
		var words = str.split(" ").filter(function(n){return n});
		$("div.lecture").each(function() {
			var div = this;
			$(div).show();
			$(div).unhighlight();
			for (var i = 0; i < words.length; i++) {
				var txt = $("h3, span.lecturer, span.semester", div).text().toLowerCase();
				if (txt.indexOf(words[i].toLowerCase()) == -1)
					$(div).hide();
			}
			if ($(div).is(':visible'))
				$("h3, span.lecturer, span.semester", div).highlight(words);
		});
		// Now see which h2 need to be shown. 
		$("h2").each(function(){
			if ($(this).nextUntil("h2").filter(":visible").filter(":not(span)").length)
				$(this).show();
			else
				$(this).hide();
		});
	});
});

	
var $buoop = {
	vs:{i:8,f:3.6,o:10.6,s:4,n:9}, 
	text: "Ihr Browser kann diese Seite eventuell nicht korrekt darstellen - bitte beschweren Sie sich bei mir (mail@breitnerundbreitner.de) oder aktualisieren Sie Ihren Browser"
	} 
/*
$buoop.ol = window.onload; 
window.onload=function(){ 
 try {if ($buoop.ol) $buoop.ol();}catch (e) {} 
 var e = document.createElement("script"); 
 e.setAttribute("type", "text/javascript"); 
 e.setAttribute("src", "js/browserupdate.js"); 
 document.body.appendChild(e); 
} 
*/

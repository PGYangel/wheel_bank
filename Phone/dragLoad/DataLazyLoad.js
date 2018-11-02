(function($, window, undefined) {
	$.fn.DataLazyLoad = function(options) {
		var elements = $(this);
		var settings = {
			//Data Load Offset
			offset: 200,
			//Load data callback
			load: function() {},
			//Which page to load
			page: 2
		}
		if (options) {
			$.extend(settings, options);
		}
		//The height of the browser window
		var winHeight = $(window).height();
		var locked = false;
		$(window).scroll(function() {
			var scrollTop = $(window).scrollTop();
			//elements height + elements top - (scrollbar top + browser window height)
			var offset = $(elements).offset().top + $(elements).height() - (scrollTop + winHeight);
			if (offset < settings.offset && !locked) {
				locked = true;
				settings.load(settings.page, function() {
					locked = false;
				});
			}
			if (offset = 0) {
				$(".list").go(0)
			}
		});
	}
	$.fn.DataLazyLoad = function(options) {
		var elements = $(this);
		var settings = {
			//Data Load Offset
			offset: 200,
			//Load data callback
			load: function() {},
			//Which page to load
			page: 2
		}
		if (options) {
			$.extend(settings, options);
		}
		//The height of the browser window
		var winHeight = $(window).height();
		var locked = false;
		var unLock = function(nextPage) {
			//Next load page, 0 is end
			if (nextPage > 0) {
				settings.page = nextPage;
				locked = false;
			}
		}
		$(window).scroll(function() {
			var scrollTop = $(window).scrollTop();
			//elements height + elements top - (scrollbar top + browser window height)
			var offset = $(elements).offset().top + $(elements).height() - (scrollTop + winHeight);
			if (offset < settings.offset && !locked) {
				locked = true;
				settings.load(settings.page, unLock);
			}
		});
	}
})(jQuery, window);
//begin this lazyloading....
$(function() {
	//Call DataLazyLoad
	$(".list").DataLazyLoad({
		load: function(page, unLocked) {
			var html = '';
			var max = 10;
			//Generate the data
			for (var i = 0; i < 10; i++) {
				html += '<li>Page: ' + page + ', Data Index: ' + i + ' </li>';
			}
			$(html).appendTo('.list');
			//Check whether to end
			page = page >= max ? 0 : page + 1;
			//To prevent repeated load, The first parameter to the next page, No page is 0
			unLocked(page);
			if (page == 0) {
				$("<li class = 'h2'>The End!</li>").appendTo('.list');
			}
		}
	});
});
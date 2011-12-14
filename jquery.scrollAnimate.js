(function($) {

	$.fn.scrollAnimate = function(params) {

		params = $.extend({ startScroll: 0, endScroll: 0, cssProperty: '', before: 0, after: 0 }, params);

		var scrollRange = params.endScroll - params.startScroll;

		var element = $(this);

		// create objects literal and assign the variable property for before and after

		var cssArgsBefore = {};
		cssArgsBefore[params.cssProperty] = params.before;

		var cssArgsAfter = {};
		cssArgsAfter[params.cssProperty] = params.after;

		var currentCss = {};

		this.each(function() {

			scrollAnimate();

			$(window).bind('scroll', function() {

			    scrollAnimate();

			});

			function scrollAnimate() {

				var scroll = $(window).scrollTop();
				var scrollPercentage = (scroll - params.startScroll) / scrollRange;

				$('.debug').text('scroll: ' + scroll + ' / scrollRange: ' + scrollRange + ' / scrollPercentage: ' + scrollPercentage);

				if(scroll < params.startScroll) {

					element.css(cssArgsBefore);

				} else if(scroll > params.endScroll) {

					element.css(cssArgsAfter);

				} else {					

					currentCss[params.cssProperty] = params.before + (params.after - params.before) * scrollPercentage;

					element.css(currentCss);

				}

			}

		});

		return this;
	};

})(jQuery);

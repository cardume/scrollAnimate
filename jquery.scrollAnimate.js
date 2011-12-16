(function($) {

	$.fn.scrollAnimate = function(params) {

		params = $.extend({ startFromElement: false, scrollType: 'vertical', startScroll: 0, endScroll: 0, cssProperty: '', before: 0, after: 0 }, params);

		var scrollRange = params.endScroll - params.startScroll;

		var element = $(this);

		// create objects literal and assign the variable property for before and after
		var cssArgsBefore = {};
		cssArgsBefore[params.cssProperty] = params.before;
		var cssArgsAfter = {};
		cssArgsAfter[params.cssProperty] = params.after;

		// setup startFromElement
		if(params.startFromElement) {

			startingElement = $(params.startFromElement);

			startingElementOffset = startingElement.offset();
			startingElementOffsetTop = startingElementOffset.top;
			startingElementOffsetLeft = startingElementOffset.left;

			var windowWidth = $(window).width();
			var windowHeight = $(window).height();

			var scrollFromTop = startingElementOffsetTop - windowHeight;
			var scrollFromLeft = startingElementOffsetLeft - windowWidth;

			$(window).bind('resize', function() {

				windowWidth = $(window).width();
				windowHeight = $(window).height();

				scrollFromTop = startingElementOffsetTop - windowHeight;
				scrollFromLeft = startingElementOffsetLeft - windowWidth;

			});

		}

		// setup css3 transform
		if(params.cssProperty == 'transform') {

			// set css3 transform webkit and moz fallbacks
			cssArgsBefore['-webkit-transform'] = params.before;
			cssArgsAfter['-webkit-transform'] = params.after;
			cssArgsBefore['-moz-transform'] = params.before;
			cssArgsAfter['-moz-transform'] = params.after;

			// get int from css3 transform rotate and skew
			if(params.before.indexOf('deg') != -1) {

				var before = params.before.split('(');
				before = before[1].split('deg');
				before = parseFloat(before[0]);

				var after = params.after.split('(');
				after = after[1].split('deg');
				after = parseFloat(after[0]);

			} else

			// get int from css3 transform scale
			if(params.before.indexOf('scale') != -1) {

				var before = params.before.split('(');
				before = before[1].split(')');
				before = parseFloat(before[0]);

				var after = params.after.split('(');
				after = after[1].split(')');
				after = parseFloat(after[0]);

			}

		}

		var currentCss = {};

		this.each(function() {

			scrollAnimate();

			$(window).bind('scroll', function() {

			    scrollAnimate();

			});

			function scrollAnimate() {

				if(params.scrollType == 'vertical') {

					var scroll = $(window).scrollTop();

					if(params.startFromElement) {

						scroll = scroll - scrollFromTop;

					}

				} else if(params.scrollType == 'horizontal') {

					var scroll = $(window).scrollLeft();

					if(params.startFromElement) {

						scroll = scroll - scrollFromLeft;

					}

				}

				var scrollPercentage = (scroll - params.startScroll) / scrollRange;

				if(scroll < params.startScroll) {

					element.css(cssArgsBefore);

				} else if(scroll > params.endScroll) {

					element.css(cssArgsAfter);

				} else {

					if(params.cssProperty == 'transform') {

						var currentTransformValue = before + (after - before) * scrollPercentage;

						if(params.before.indexOf('rotate') != -1)
							var currentTransform = 'rotate(' + currentTransformValue + 'deg)';

						else if(params.before.indexOf('skew') != -1)
							var currentTransform = 'skew(' + currentTransformValue + 'deg)';

						else if(params.before.indexOf('scale') != -1)
							var currentTransform = 'scale(' + currentTransformValue + ')';

						currentCss[params.cssProperty] = currentTransform;
						currentCss['-moz-transform'] = currentTransform;
						currentCss['-webkit-transform'] = currentTransform;

						element.css(currentCss);

					} else {

						currentCss[params.cssProperty] = params.before + (params.after - params.before) * scrollPercentage;
						element.css(currentCss);

					}

				}

			}

		});

		return this;
	};

})(jQuery);

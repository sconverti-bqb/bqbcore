(function setupSW() {
  'use strict'

  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').then(function (registration) {
        console.log('ServiceWorker registration successful with scope: ', registration.scope)
        registration.onupdatefound = function () {
          var installingWorker = registration.installing
          installingWorker.onstatechange = function () {
            switch (installingWorker.state) {
              case 'installed':
                if (navigator.serviceWorker.controller) {
                  console.log('new update available')
                  location.reload(true)
                }
                break

              default:
            }
          }
        }
      }).catch(function (err) {
        console.log('ServiceWorker registration failed: ', err)
      })
    })
  }
}())

$(document).ready(function(){
  $(".slider-col-12").owlCarousel({
    nav: true,
    dots: false,
    loop: true,
    responsive : {
      0: { items: 1 },
      992: { items: 2 },
      1200: { items: 3 }
    }
  });

  $(".slider-col-6").owlCarousel({
    nav: true,
    dots: false,
    loop: true,
    responsive : {
      0: { items: 1 },
      1200: { items: 2 }
    }
  });

  $(".bqb-campaign-slider").owlCarousel({
    nav: false,
    dots: true,
    items: 1
  });

  $(".bqb-banner-slider").owlCarousel({
    nav: false,
    dots: true,
    loop: true,
    items: 1,
    margin: 10,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true
  });

  $(".bqb-payment-options .bqb-carousel").owlCarousel({
    nav: true,
    dots: true,
    loop: true,
    responsive : {
      0: { items: 2 },
      576: { items: 3 },
      768: { items: 2 },
      992: { items: 4 },
      1200: { items: 6 }
    }
  });

  $('.brand-heading .heading-hamburguer').click(function(){
    $('.header-navigation').toggleClass('show');
    $('body').toggleClass('hamburguer-open');
  })

  $('.footer-navigation .navigation-title').click(function(){
    $(this).parent().toggleClass('open');
    $(this).find('i').toggleClass('bqb-icon-chevron-up bqb-icon-chevron-down');
  })

  $('.nav-item.special .nav-link').click(function(){
    $('.dropdown-menu li .menu-boarding-info').addClass('loading');
    setTimeout(function(){
      $('.dropdown-menu li .menu-boarding-info').removeClass('loading');
    }, 5000);
  })

  $('.fares-cluster .cluster-main').click(function(){
    $(this).parent().toggleClass('expanded');
    $(this).parent().toggleClass('open');
    $(this).find('i').toggleClass('bqb-icon-chevron-up bqb-icon-chevron-down');
  })

  $('.cluster-categories .categories-item .item-types .types-option').click(function(){
    $('.cluster-categories .categories-item .item-types .types-option').removeClass('active');
    $(this).addClass('active');
  })

  // Header Dropdown submenu
  $('.dropdown-menu a.dropdown-toggle').on('click', function(e) {
    if (!$(this).next().hasClass('show')) {
      $(this).parents('.dropdown-menu').first().find('.show').removeClass("show");
    }
    var $subMenu = $(this).next(".dropdown-menu");
    $subMenu.toggleClass('show');

    $(this).parents('li.nav-item.dropdown.show').on('hidden.bs.dropdown', function(e) {
      $('.dropdown-submenu .show').removeClass("show");
    });

    return false;
  });
});


// Form validation tooltips
(function() {
  'use strict';

  window.addEventListener('load', function() {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByClassName('needs-validation');

    // Fetch Newsletter Form
    var newsletter = document.getElementById('newsletterForm');

    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        } else if (newsletter.checkValidity() === true) {
          event.preventDefault();
          event.stopPropagation();
          $('#mailOffersModal').modal();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();


// For a full explanation of this code, please refer to the blogpost at http://www.bram.us/2014/01/05/css-animated-content-switching/
jQuery(function($) {

	var startAnimation = function($panelContainer) {
		// Set .animating class (which triggers the CSS to start the animation)
		$panelContainer.addClass('animating');

	};

	var updatePanelNav = function($panelNav, $panelContainer, $panelToSlideIn, numPanels) {
		// Find index of $panelToSlideIn in the $panelContainer
		var idx = $panelToSlideIn.index('#' + $panelContainer.attr('id') + ' > .panel');

		if (idx === 0) {
			$panelNav.find('a[href="#prev"]').addClass('inactive');
		} else {
			$panelNav.find('a[href="#prev"]').removeClass('inactive');
		}

		if (idx == numPanels-1) {
			$panelNav.find('a[href="#next"]').addClass('inactive');
		} else {
			$panelNav.find('a[href="#next"]').removeClass('inactive');
		}

	};

	var stopAnimation = function($panelContainer, $panels, $panelToSlideIn) {
		// Fix for browsers who fire this handler for both prefixed and unprefixed events (looking at you, Chrome): remove any listeners
		// $panelToSlideIn.off('transitionend webkitTransitionEnd	MSTransitionEnd');
		// An optional extra class (or set of classes) that might be set on the panels
		var extraClass = $panels.data('extraclass') || '';

		// set slid in panel as the current one
		$panelToSlideIn.removeClass().addClass('panel current ' + extraClass);

		// reset all other panels
		$panels.filter(':not(#' + $panelToSlideIn.attr('id')	+ ')').removeClass().addClass('panel ' + extraClass);

		// Allow a new animation
		$panelContainer.removeClass('animating');

	};

	var setExitPanel = function($panelToSlideOut, exitAnimation) {
		$panelToSlideOut
			.addClass('exit ' + exitAnimation)
			.removeClass('current');
	};

	var setEnterPanel = function($panelContainer, $panels, $panelToSlideIn, enterAnimation) {
		$panelToSlideIn

			// Slide it into view
			.addClass('enter ' + enterAnimation)

			// When sliding in is done,
			// .one('transitionend webkitTransitionEnd MSTransitionEnd', function(e) {

				// moved to a setTimeout in the click handling logic itself because Firefox doesn't always fire this!!!
				// stopAnimation($panelContainer, $panels, $panelToSlideIn)

			// })
			;
	};

	$('.login-nav').each(function(i) {
		var $panelNav = $(this),
			$panelNavItems = $panelNav.find('a'),
			$panelContainer = $('#' + $panelNav.data('panelwrapper')),
			$panels = $panelContainer.find('> .panel'),
			numPanels = $panels.length,
			animationDuration = ($panelContainer.data('sequential') == 'yes') ? 600 : 300;

		if (numPanels > 1) {
			$panelNav.find('a[href="#next"]').removeClass('inactive');
		}

		// When clicking on any of the panel navigation items
		$panelNavItems.on('click', function(e) {

			// Don't follow the link
			e.preventDefault();

			// Local vars
			var $panelToSlideIn, $panelToSlideOut, enterAnimation, exitAnimation;

			// Don't do anything if we are currently animating
			if ($panelContainer.is('.animating')) return false;

			// Define the panel to slideOut
			$panelToSlideOut = $panels.filter('.current');

			// Define the the panel to slide in
			if ($(this).attr('href') == '#next') {
				$panelToSlideIn = $panels.filter('.current').next('.panel');
			} else if ($(this).attr('href') == '#prev') {
				$panelToSlideIn = $panels.filter('.current').prev('.panel');
			} else {
				$panelToSlideIn = /* $panels.filter('#' + */ $($(this).attr('href')) /* .attr('id')) */;
			}

			// Don't do anything if there is no new panel
			if (!$panelToSlideIn.length) return;

			// Don't do anything if the new panel equals the current panel
			if ($panelToSlideOut.attr('id') == $panelToSlideIn.attr('id')) return;

			// Define animations to use
			enterAnimation = $panelToSlideIn.data('enter') || $panelContainer.data('enter');
			exitAnimation = $panelToSlideOut.data('exit') || $panelContainer.data('exit');

			// Set the exit panel
			setExitPanel($panelToSlideOut, exitAnimation);

			// Set the enter panel
			setEnterPanel($panelContainer, $panels, $panelToSlideIn, enterAnimation);

			// Start the animation (immediately)
			// @note: using a setTimeout because "it solves everything", dixit @rem
			setTimeout(function() {
				startAnimation($panelContainer);
			}, 0);

			// Update next/prev buttons
			updatePanelNav($panelNav, $panelContainer, $panelToSlideIn, numPanels);

			// Stop the animation after a while
			setTimeout(function() {
				stopAnimation($panelContainer, $panels, $panelToSlideIn);
			}, animationDuration);

		});
	});
});

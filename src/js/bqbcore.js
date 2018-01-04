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

  $(".bqb-banner-slider.slider-one-items").owlCarousel({
    nav: true,
    dots: false,
    loop: true,
    items: 1,
    margin: 10,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true
  });

  $(".bqb-banner-slider.slider-two-items").owlCarousel({
    nav: true,
    dots: false,
    loop: true,
    responsive : {
      0: { items: 1 },
      1200: { items: 2 }
    },
    margin: 10,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true
  });

  $(".bqb-banner-slider.slider-three-items").owlCarousel({
    nav: true,
    dots: false,
    loop: true,
    responsive : {
      0: { items: 1 },
      1200: { items: 3 }
    },
    margin: 10,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true
  });

  $(".bqb-payment-options .bqb-carousel").owlCarousel({
    nav: true,
    dots: false,
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
});

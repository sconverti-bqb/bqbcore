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
    stagePadding: 50,
    loop: true,
    responsive : {
      0: { items: 1 },
      992: { items: 2 },
      1200: { items: 3 }
    }
  });

  $(".slider-col-6").owlCarousel({
    nav: true,
    stagePadding: 50,
    loop: true,
    responsive : {
      0: { items: 1 },
      1200: { items: 2 }
    }
  });

  $(".bqb-campaign-slider").owlCarousel({
    nav: false,
    items: 1
  });

  $('.nav-item.special .nav-link').click(function(){
    $('.dropdown-menu li .menu-boarding-info').addClass('loading');
    setTimeout(function(){
      $('.dropdown-menu li .menu-boarding-info').removeClass('loading');
    }, 5000);
  })
});

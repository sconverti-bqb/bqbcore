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
  $(".bqb-card-slider").owlCarousel({
    nav: true,
  });

  $(".bqb-campaign-slider").owlCarousel({
    nav: true,
    items: 1,
  });

  $(function() {
    $('.nav-link').click(function(e){
      $('.nav-item').removeClass('show');
      $(this).closest('.nav-item').toggleClass('show');
      e.stopPropagation()
    })
    $(document).on("click", function(e) {
      if ($(e.target).is(".nav-item") === false) {
        $('.nav-item').removeClass("show");
      }
    });
  });

  $('.nav-item.special .nav-link').click(function(){
    setTimeout(function(){
      $('.dropdown-menu li .menu-boarding-info').removeClass('loading');
    }, 2000);
  })
});

(function () {
  'use strict';

    angular.module('LocationApp')
    .directive('appMap', function ($rootScope) {
      return {
        restrict: "E",
        replace: true,
        template: "<div></div>",

        link: function (scope, element, attrs) {

          if(!!navigator.geolocation) {
           var map;

           var mapOptions = {
             zoom: 15,
             mapTypeId: google.maps.MapTypeId.ROADMAP,
             fullscreenControl: true
           };
           map = new google.maps.Map(element[0], mapOptions);

           navigator.geolocation.getCurrentPosition(function(position) {

             var geolocate = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);

             var infowindow = new google.maps.InfoWindow({
               map: map,
               position: geolocate,
               content:
                 '<h1>You are located here!</h1>' +
                 '<h2>Lat: ' + position.coords.latitude + '</h2>' +
                 '<h2>Long: ' + position.coords.longitude + '</h2>'
             });
             console.log('position.coords.latitude ', position.coords.latitude , 'position.coords.longitude', position.coords.longitude);
             map.setCenter(geolocate);

           });

         } else {
           console.log('No Geolocation Support');
         }
        }
      }

    });



})();

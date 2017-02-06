(function() {
    'use strict';

    angular.module('LocationApp')
        .config(RoutesConfig);

    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

    function RoutesConfig($stateProvider, $urlRouterProvider) {
        // Redirect to home page if no other url matches
        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('/home', {
                url: '/',
                templateUrl: 'src/templates/home.template.html'
            })
            .state('mainList', {
                url: '/main-list',
                resolve: {
                   check : function ($location, $rootScope) {
                     if(!$rootScope.isUserLoggedIn) {
                          $state.go('/home');
                     }
                   }
                },
                  templateUrl: 'src/templates/main-list.template.html'
            })
    }
})();

(function() {
    'use strict';

    angular.module('LocationApp')
        .controller('AppController', AppController);

    AppController.$inject = ['Facebook', '$scope', '$rootScope', '$location'];

    function AppController(Facebook, $scope, $rootScope, $location) {
        $scope.info = {};
        $scope.isUserLoggedIn = false;
        $rootScope.isUserLoggedIn = false;

        $scope.facebook = {
            username: '',
            email: ''
        };

        $rootScope.$on("fb_statusChange", function(event, args) {
            $scope.$apply(function() {
                $scope.facebook.username = args.username;
                $scope.facebook.email = args.email;
                $scope.isUserLoggedIn = (args.status == 'connected');
                $rootScope.isUserLoggedIn = (args.status == 'connected');
            });
        });
        $rootScope.$on("fb_logged_in", function(event, args) {
            $scope.$apply(function() {
                $scope.facebook.username = args.username;
                $scope.facebook.email = args.email;
                $location.path('/main-list');
            });
        });
        $rootScope.$on("fb_get_login_status", function() {
            Facebook.getLoginStatus();
        });
        $rootScope.$on("fb_login_failed", function() {
            console.log("fb_login_failed");
        });
        $rootScope.$on("fb_logout_succeded", function(event, args) {
            console.log("fb_logout_succeded");
            $scope.$apply(function() {
                // $scope.facebook.username = args.username;
                // $scope.facebook.email = args.email;
                $location.path('/home');
                $scope.isUserLoggedIn = (args.status == 'connected');
                $rootScope.isUserLoggedIn = (args.status == 'connected');
            });
        });
        $rootScope.$on("fb_logout_failed", function() {
            console.log("fb_logout_failed!");
        });

        $rootScope.$on("fb_connected", function(event) {
            console.log('user is connected');

        });

        $scope.login = function() {
            Facebook.login();
        };

        $scope.logout = function() {
            Facebook.logout();
            $rootScope.session = {};
        };
    }
})();

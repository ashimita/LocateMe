(function () {
'use strict';

angular.module('FacebookProvider', [])
.factory('Facebook', function ($rootScope) {
    return {
        getLoginStatus:function () {
            FB.getLoginStatus(function (response) {
                switch (response.status) {
                    case 'connected':
                        FB.api('/me', 'GET', {fields: 'email, first_name, name'}, function (response) {
                           console.log('Welcome ',response.name);
                             $rootScope.$broadcast('fb_connected', {'username':response.name, 'email': response.email});
                       });
                        break;
                    case 'not_authorized':
                    // The person is logged into Facebook, but not your app.
                       console.log('Not authorized');
                       break;
                    case 'unknown':
                    console.log('Please log in to FB');
                        FB.login(function (response) {
                            if (response.authResponse) {
                              FB.api('/me', 'GET', {fields: 'email, first_name, name'}, function (response) {
                                 console.log('Welcome ',response.name);
                                   $rootScope.$broadcast('fb_logged_in', {'username':response.name, 'email': response.email});
                             });
                            } else {
                                $rootScope.$broadcast('fb_login_failed');
                            }
                        }, {scope:'email, user_likes', return_scopes: true});
                        break;

                }
            }, true);
        },
        login:function () {
          if($rootScope.isUserLoggedIn) {
            FB.logout(function (response) {
                if (response) {
                    $rootScope.$broadcast('fb_logout_succeded', {'username':'', 'email': ''});
                } else {
                    $rootScope.$broadcast('fb_logout_failed');
                }
            });
          }  else {
            FB.getLoginStatus(function (response) {
              switch (response.status) {
                case 'connected':
                $rootScope.$broadcast('fb_connected', {facebook_id:response.authResponse.userID});
                console.log('response.authResponse.userID', response.authResponse.userID);
                break;
                case 'not_authorized':
                // The person is logged into Facebook, but not your app.
                console.log('Not authorized');
                break;
                case 'unknown':
                console.log('Please log in to FB');
                FB.login(function (response) {
                  if (response.authResponse) {
                    FB.api('/me', 'GET', {fields: 'email, first_name, name'}, function (response) {
                      console.log('Welcome ',response.name);
                      $rootScope.$broadcast('fb_logged_in', {'username':response.name, 'email': response.email});
                    });
                  } else {
                    $rootScope.$broadcast('fb_login_failed');
                  }
                }, {scope:'email, user_likes', return_scopes: true});
                break;

              }
            }, true);
          }
        },
        // logout:function () {
        //     FB.logout(function (response) {
        //         if (response) {
        //             $rootScope.$broadcast('fb_logout_succeded', {'username':'', 'email': ''});
        //         } else {
        //             $rootScope.$broadcast('fb_logout_failed');
        //         }
        //     });
        // }

    };
});
})();

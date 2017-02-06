(function() {
    angular.module('LocationApp', ['FacebookProvider', 'ui.router'])
        .run(function($rootScope) {
            window.fbAsyncInit = function() {
                FB.init({
                    appId: '146478719191092',
                    status: true,
                    cookie: true,
                    xfbml: true
                });

                FB.Event.subscribe('auth.statusChange', function(response) {
                    if (response.status === 'connected') {
                        FB.api('/me', 'GET', {fields: 'email, first_name, name'}, function(data) {
                            $rootScope.$broadcast("fb_statusChange", {
                                'status': response.status,
                                'username': data.name,
                                'email': data.email
                            });
                        });
                    };


                });
            };

            (function(d) {
                var js, id = 'facebook-jssdk',
                    ref = d.getElementsByTagName('script')[0];
                if (d.getElementById(id)) {
                    return;
                }
                js = d.createElement('script');
                js.id = id;
                js.async = true;
                js.src = "//connect.facebook.net/en_US/all.js";
                ref.parentNode.insertBefore(js, ref);
            }(document));

            function testAPI() {
                console.log('Welcome!  Fetching your information.... ');
                FB.api('/me', function(response) {
                    console.log('Successful login for: ' + response.name);
                });
            }
        });

})();

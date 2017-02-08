# LocateMe

It is built on Angular 1.5.

In the index.html file please modify the following:

<script src="https://maps.googleapis.com/maps/api/js?key=<your-google-map-dev-key>"></script>

In the app.js file, modify the appId.

  FB.init({
                    appId: 'your_fb_dev_key',
                    status: true,
                    cookie: true,
                    xfbml: true
                });


It can be executed locally by using browser-sync

 browser-sync start --server --directory --files "**/*"

index.html is the home page.


This code asks the user to login using their facebook. So popup blockers should be disabled.

Once authenticated, it redirects the user to the main_list page, that displays the user's current location

One can also navigate using the Home and the Main nav links at the top.

On click of the Facebook logout button, the user is redirected to the login screen. 

Unauthorized acces to the main-list (location page) is prevented if the user is not logged in.

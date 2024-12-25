<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Facebook Login</title>
    <script async defer crossorigin="anonymous" src="https://connect.facebook.net/en_US/sdk.js"></script>
</head>
<body>

    <h2>Login with Facebook</h2>

    <!-- This will be the Facebook Login button -->
    <div id="fb-root"></div>
    <fb:login-button 
        scope="public_profile,email" 
        onlogin="checkLoginState();">
    </fb:login-button>

    <div id="status"></div>

    <script>
        // Initialize the Facebook SDK
        window.fbAsyncInit = function() {
            FB.init({
                appId      : 'YOUR_APP_ID',  // Replace with your Facebook App ID
                cookie     : true,
                xfbml      : true,
                version    : 'v17.0'  // Use the appropriate Facebook API version
            });

            FB.AppEvents.logPageView();
        };

        // This function is triggered after login
        function checkLoginState() {
            FB.getLoginStatus(function(response) {
                statusChangeCallback(response);
            });
        }

        // Callback function to handle the login state
        function statusChangeCallback(response) {
            console.log('Facebook login status:', response);

            if (response.status === 'connected') {
                // User is logged into Facebook and the app
                document.getElementById('status').innerHTML = 'You are logged in.';
                fetchUserDetails();
            } else {
                // The person is not logged into Facebook or the app
                document.getElementById('status').innerHTML = 'Please log into Facebook.';
            }
        }

        // Fetch the user's name and email once logged in
        function fetchUserDetails() {
            FB.api('/me?fields=id,name,email', function(response) {
                console.log('User details:', response);
                document.getElementById('status').innerHTML = 'Logged in as: ' + response.name;
            });
        }
    </script>
</body>
</html>

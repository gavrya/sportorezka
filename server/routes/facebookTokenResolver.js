const config = require('config');

const facebookAppId = config.facebook.appId;
const facebookAppVersion = config.facebook.apiVersion;

const html = `<!DOCTYPE html>
<html>
<head>
  <title>Facebook oauth test</title>
</head>
<body>
<p>
  <h2>Auth info:</h2>
  <pre id="authInfo"></pre>
</p>
<p>
  <h2>User info:</h2>
  <pre id="userInfo"></pre>
</p>
<script>
  window.fbAsyncInit = function () {
    FB.init({
      appId: '${facebookAppId}',
      autoLogAppEvents: true,
      xfbml: true,
      version: '${facebookAppVersion}'
    });

    const facebookLogin = () => {
      FB.login((response) => {
        if (response.authResponse) {
          document.getElementById('authInfo').innerText = JSON.stringify(response.authResponse, null, 2);

          FB.api(
            '/me',
            {
              fields: 'id,name,first_name,last_name,picture,short_name,email'
            },
            (response) => {
              document.getElementById('userInfo').innerText = JSON.stringify(response, null, 2);
            }
          );
        } else {
          console.log('User cancelled login or did not fully authorize.');
        }
      }, { scope: 'email' });
    };

    if (FB.getAccessToken() != null) {
      FB.logout(function (response) {
        console.log('Facebook user logout');
      });

      facebookLogin();
    } else {
      facebookLogin();
    }
  };
</script>
<script async defer src="https://connect.facebook.net/en_US/sdk.js"></script>
</body>
</html>
`;

const facebookTokenResolver = async (ctx) => {
  ctx.body = html;
};

module.exports = facebookTokenResolver;

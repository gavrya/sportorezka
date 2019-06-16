const axios = require('axios');
const config = require('config');

const fetchLongLivedToken = async (accessToken) => {
  const facebookAppId = config.facebook.appId;
  const facebookAppSecret = config.facebook.appSecret;

  const response = await axios({
    method: 'get',
    url: 'https://graph.facebook.com/oauth/access_token',
    params: {
      grant_type: 'fb_exchange_token',
      client_id: facebookAppId,
      client_secret: facebookAppSecret,
      fb_exchange_token: accessToken,
    },
    timeout: 10000,
  });

  const tokenInfo = response.data;

  return tokenInfo;
};

module.exports = fetchLongLivedToken;

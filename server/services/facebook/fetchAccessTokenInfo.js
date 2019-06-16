const axios = require('axios');
const config = require('config');

const fetchAccessTokenInfo = async (accessToken) => {
  const facebookAppId = config.facebook.appId;
  const facebookAppSecret = config.facebook.appSecret;

  const response = await axios({
    method: 'get',
    url: 'https://graph.facebook.com/debug_token',
    params: {
      input_token: accessToken,
      access_token: `${facebookAppId}|${facebookAppSecret}`,
    },
    timeout: 10000,
  });

  const tokenInfo = response.data.data;

  return tokenInfo;
};

module.exports = fetchAccessTokenInfo;

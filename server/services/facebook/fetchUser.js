const axios = require('axios');

const fetchUser = async (accessToken) => {
  const response = await axios({
    method: 'get',
    url: 'https://graph.facebook.com/me',
    params: {
      fields: 'id,name,first_name,last_name,short_name,picture,email',
      access_token: accessToken,
    },
    timeout: 10000,
  });

  const user = response.data;

  return user;
};

module.exports = fetchUser;

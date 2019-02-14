module.exports = async function(context, cb) {
  const fetch = require('node-fetch');

  const {code, state} = context.query;
  const client_id = '93bc6d6286ff1f8d864c';
  const client_secret = context.secrets.clientSecret;

  const requestUrl = `https://github.com/login/oauth/access_token?client_id=${client_id}&client_secret=${client_secret}&code=${code}`;

  const result = await fetch(requestUrl, {
    headers: {
      'Accept': 'application/json',
    },
  });
  const resultJson = await result.json();

  cb(null, resultJson);
};
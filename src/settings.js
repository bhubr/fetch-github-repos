const dotenv = require('dotenv');

dotenv.config();

const clientId = process.env.OAUTH2_CLIENT_ID;
const clientSecret = process.env.OAUTH2_CLIENT_SECRET;
const redirectUri = process.env.OAUTH2_REDIRECT_URI;

module.exports = {
  clientId,
  clientSecret,
  redirectUri,
};

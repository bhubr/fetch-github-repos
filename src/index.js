const fs = require('node:fs/promises');
const express = require('express');
const axios = require('axios')

const { clientId, clientSecret, redirectUri } = require('./settings');
const parseQueryString = require('./parse-query-string');

const app = express();

const readToken = async () => {
  try {
    const token = await fs.readFile('.token', 'utf-8');
    return token;
  } catch (err) {
    return null;
  }
};

const writeToken = async (token) => {
    await fs.writeFile(".token", token)
}

app.get('/auth', async (req, res) => {
  const token = await readToken();
  if (token) {
    return res.send('already authenticated');
  }
  const authScreenBaseUrl = 'https://github.com/login/oauth/authorize';
  const url = new URL(authScreenBaseUrl);
  url.searchParams.append('client_id', clientId);
  url.searchParams.append('redirect_uri', redirectUri);
  return res.send(`
    <a href="${url.toString()}">Login</a>
    `);
});

const requestToken = async (code) => axios.post('https://github.com/login/oauth/access_token', {
    client_id: clientId,
    client_secret: clientSecret,
    code,
    redirect_uri: redirectUri
}).then(res => res.data)

app.get('/oauth2-cb', async (req, res) => {
  const rawData = await requestToken(req.query.code)
  const data = parseQueryString(rawData)
  console.log(data)
  await writeToken(data.access_token)
  res.send(data)
})

app.listen(3030, () => {
  console.log(`listening on 3030`);
});

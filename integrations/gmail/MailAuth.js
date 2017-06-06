/* eslint-disable import/no-dynamic-require  */
const fs = require('fs-extra');
const path = require('path');
const readline = require('readline');
const GoogleAuth = require('google-auth-library');

const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
const TOKEN_DIR = path.join(__dirname, 'credentials');
const TOKEN_PATH = path.join(TOKEN_DIR, 'gmail-credential.json');
const CLIENT_SECRET_PATH = path.join(TOKEN_DIR, 'client_secret.json');
const CLIENT_SECRET = require(CLIENT_SECRET_PATH);
const activeCredentials = CLIENT_SECRET.installed;
const clientSecret = activeCredentials.client_secret;
const clientId = activeCredentials.client_id;
const redirectUrl = activeCredentials.redirect_uris[0];

module.exports = {
  authenticate
};


function authenticate() {
  const auth = new GoogleAuth();
  const oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

  return fs.readFile(TOKEN_PATH)
    .then(parseReadTokenToObject)
    .catch(() => generateNewToken(oauth2Client))
    .then(token => assignTokenToOauth(token, oauth2Client))
    .then(() => (oauth2Client));
}

function parseReadTokenToObject(readToken) {
  try {
    return JSON.parse(readToken);
  } catch (e) {
    return readToken;
  }
}

function assignTokenToOauth(token, oauth2Client) {
  oauth2Client.credentials = token;
  return oauth2Client;
}

function generateNewToken(oauth2Client) {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  });

  console.log('Authorize this app by visiting this url: \n', authUrl);

  return readTokenFromStdin()
          .then(inputToken => validateToken(inputToken, oauth2Client))
          .then(storeTokenToJsonFile);
}

function readTokenFromStdin() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  return new Promise((resolve) => {
    rl.question('Enter the code from that page here: ', (readToken) => {
      rl.close();
      resolve(readToken);
    });
  });
}

function validateToken(readToken, oauth2Client) {
  return new Promise((resolve, reject) => {
    oauth2Client.getToken(readToken, (err, validToken) => {
      if (err) {
        reject(`Error while trying to retrieve access token: ${err}`);
        return;
      }
      resolve(validToken);
    });
  });
}

function storeTokenToJsonFile(token) {
  return fs.writeJson(TOKEN_PATH, token)
    .then(() => console.log('Token stored to', TOKEN_PATH))
    .then(() => (token));
}

const fs = require('fs');
const readline = require('readline');
const google = require('googleapis');
const googleAuth = require('google-auth-library');

const SCOPES = ['https://www.googleapis.com/auth/gmail.readonly'];
const TOKEN_DIR = './credentials/';
const TOKEN_PATH = `${TOKEN_DIR}gmail-credential.json`;
const CLIENTSECRET_PATH = `${TOKEN_DIR}client_secret.json`;

const gmail = google.gmail('v1');


(() => {
  module.exports = {
    getMail
  };

  function getMail(query) {
    return new Promise((resolve, reject) => {
      getCredentials().then((credentials) => {
        gmail.users.messages.list({
          auth: credentials,
          userId: 'me',
          q: query,
        }, (err, response) => {
          if (err) {
            reject('The API returned an error:', err);
            return;
          }

          Promise.all(response.messages.map(message => getMessage(credentials, 'me', message)))
            .then(resolve)
            .catch(reject);
        });
      });
    });
  }

  function getCredentials() {
    return new Promise((resolve, reject) => {
      fs.readFile(CLIENTSECRET_PATH, (err, content) => {
        if (err) {
          reject('Error loading client secret file:', err);
          return;
        }

        authorize(JSON.parse(content)).then(token => resolve(token)).catch('error authoring');
      });
    });
  }

  function authorize(credentials) {
      /* eslint new-cap: 0 */
    const clientSecret = credentials.installed.client_secret;
    const clientId = credentials.installed.client_id;
    const redirectUrl = credentials.installed.redirect_uris[0];
    const auth = new googleAuth();
    const oauth2Client = new auth.OAuth2(clientId, clientSecret, redirectUrl);

    return new Promise((resolve) => {
      fs.readFile(TOKEN_PATH, (err, token) => {
        if (err) {
          getNewToken(oauth2Client);
        } else {
          oauth2Client.credentials = JSON.parse(token);
          resolve(oauth2Client);
        }
      });
    });
  }

  function getNewToken(oauth2Client) {
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: SCOPES
    });
    console.log('Authorize this app by visiting this url: ', authUrl);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    return new Promise((resolve, reject) => {
      rl.question('Enter the code from that page here: ', (code) => {
        rl.close();
        oauth2Client.getToken(code, (err, token) => {
          if (err) {
            reject('Error while trying to retrieve access token', err);
            return;
          }
          oauth2Client.credentials = token;
          storeToken(token);
          resolve(oauth2Client);
        });
      });
    });
  }

  function storeToken(token) {
    try {
      fs.mkdirSync(TOKEN_DIR);
    } catch (err) {
      if (err.code !== 'EEXIST') {
        throw err;
      }
    }
    fs.writeFile(TOKEN_PATH, JSON.stringify(token));
    console.log('Token stored to', TOKEN_PATH);
  }

  function getMessage(credentials, userId, message) {
    return new Promise((resolve, reject) => {
      gmail.users.messages.get({
        auth: credentials,
        userId,
        id: message.id,
      }, (error, response) => {
        if (error) {
          reject('error retrieving messages', error);
          return;
        }
        resolve(response);
      });
    });
  }
})();

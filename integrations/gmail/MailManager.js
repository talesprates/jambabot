const google = require('googleapis');

const { authenticate } = require('./MailAuth');
const HeadersEnum = require('./GmailMessageHeaderEnum');

const gmail = google.gmail('v1');

(() => {
  module.exports = {
    getMails,
    HeadersEnum
  };

  function getMails(query) {
    return (
      authenticate()
        .then(oauth2Client => fetchMailsList(oauth2Client, query))
    );
  }

  function fetchMailsList(oauth2Client, query) {
    const options = {
      auth: oauth2Client,
      userId: 'me',
      q: query,
    };

    return new Promise((resolve, reject) => {
      gmail.users.messages.list(options, (err, response) => {
        if (err) {
          reject(`The gmail API returned an error: ${response}`);
          return;
        }

        resolve(
          Promise.all(response.messages.map(message => fetchMessage(oauth2Client, message)))
        );
      });
    });
  }

  function fetchMessage(oauth2Client, message) {
    return new Promise((resolve, reject) => {
      gmail.users.messages.get({
        auth: oauth2Client,
        userId: 'me',
        id: message.id,
      }, (error, response) => {
        if (error) {
          reject(`error retrieving messages: ${response}`);
          return;
        }
        resolve(response);
      });
    });
  }
})();

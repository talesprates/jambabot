const google = require('googleapis');

const { authenticate } = require('./MailAuth');

const gmail = google.gmail('v1');


(() => {
  module.exports = {
    getMails
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
          reject('The gmail API returned an error: ', response);
          return;
        }

        resolve(
          Promise.all(response.messages.map(message => fetchMessage(oauth2Client, 'me', message)))
        );
      });
    });
  }


  function fetchMessage(oauth2Client, userId, message) {
    return new Promise((resolve, reject) => {
      gmail.users.messages.get({
        auth: oauth2Client,
        userId, // TODO it is really mandatory?
        id: message.id,
      }, (error, response) => {
        if (error) {
          reject('error retrieving messages', response);
          return;
        }
        resolve(response);
      });
    });
  }
})();

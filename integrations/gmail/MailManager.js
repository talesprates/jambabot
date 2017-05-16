const google = require('googleapis');

const { authenticate } = require('./MailAuth');

const gmail = google.gmail('v1');

const GmailMessageHeaderEnum = {
  DELIVEREDTO: 0,
  RECEIVED: 1,
  XRECEIVED: 2,
  ARCSEAL: 3,
  ARCMESSAGESIGNATURE: 4,
  ARCAUTHENTICATIONRESULTS: 5,
  RETURNPATH: 6,
  RECEIVED_2: 7,
  RECEIVEDSPF: 8,
  AUTHENTICATIONRESULTS: 9,
  DKIMSIGNATURE: 10,
  DKIMSIGNATURE_2: 11,
  DATE: 12,
  FROM: 13,
  TO: 14,
  MESSAGEID: 15,
  SUBJECT: 16,
  MIMEVERSION: 17,
  CONTENTTYPE: 18,
  CONTENTTRANSFERENCODING: 19,
  XSESOUTGOING: 20,
  FEEDBACKID: 21
};

(() => {
  module.exports = {
    getMails,
    GmailMessageHeaderEnum
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

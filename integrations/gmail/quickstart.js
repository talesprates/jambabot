const MailManager = require('./MailManager');

// TODO when using this service, try to pass the order ID to limit the resutls
// TODO create an enun to use the headers on payload
MailManager.getMails('from:ifood label:inbox confirmado -experiência')
  .then(mails => mails.forEach((mail) => {
    console.log(mail.payload.headers[MailManager.GmailMessageHeaderEnum.SUBJECT].value);
  }))
  .catch(error => console.log(error));

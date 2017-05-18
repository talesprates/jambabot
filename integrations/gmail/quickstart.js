const MailManager = require('./MailManager');

MailManager.getMails('from:ifood label:inbox confirmado -experiência')
  .then(mails => mails.forEach((mail) => {
    console.log(mail.payload.headers[MailManager.GmailMessageHeaderEnum.SUBJECT].value);
  }))
  .catch(error => console.log(error));

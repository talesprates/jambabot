const Mail = require('./Mail');

Mail.getMail('from:ifood label:inbox confirmado -experiência')
  .then(mails => mails.forEach(mail => console.log(mail.payload.headers[16].value)))
  .catch(error => console.log(error));

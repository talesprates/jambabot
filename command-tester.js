const bodyParser = require('body-parser');
const express = require('express');

const variables = require('./variables');
const parseCommand = require('./commands/parseCommand');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());

app.post('/command-tester', (req, res) => {
  const postData = req.body;

  const message = {
    userName: postData.userName || 'silviao',
    firstName: postData.firstName || 'Silviao',
    lastName: postData.lastName || 'Bot',
    userText: postData.text.substr(postData.trigger_word.length).replace(/\s+/g, ' ').trim()
  };

  parseCommand(message, (response) => {
    if (!response) {
      res.status(404).send();
      return;
    }

    res.send(`{"text": ${JSON.stringify(response)}}`);
  });
});


const server = app.listen(6001, () => {
  console.info('jambabot app listening on port 6001!');
  console.info(`variables: ${JSON.stringify(variables)}`);
});


/*
 * Ensure that the express server will not keep running after close node
 */
process.on('SIGTERM', () => {
  console.log('Stopping dev server');
  server.close(() => { process.exit(0); });
});

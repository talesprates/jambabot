const bodyParser = require('body-parser');
const express = require('express');

const variables = require('./variables');
const parseCommand = require('./commands/parseCommand');
const slack = require('./integrations/slack');


(() => {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.text());

  app.post('/trigger', (slackRequest, slackResponse) => {
    const postData = slackRequest.body;

    if (!isValidToken(postData.token)) {
      console.info('Invalid token: ', postData.token);
      slackResponse.status(403).send();
      return;
    }

    slack.bot.api.users.info({ user: postData.user_name }, (error, usersInfoResponse) => {
      const user = usersInfoResponse.user;
      const message = {
        userName: user.name,
        firstName: user.profile.first_name,
        lastName: user.profile.last_name,
        userText: postData.text.substr(slackRequest.body.trigger_word.length).replace(/\s+/g, ' ').trim()
      };

      parseCommand(message, (response) => {
        if (!response) {
          slackResponse.status(404).send();
          return;
        }

        slackResponse.send(`{"text": ${JSON.stringify(response)}}`);
      });
    });
  });

  const server = app.listen(6001, () => {
    console.info('jambabot app listening on port 6001!');
    console.info(`variables: ${JSON.stringify(variables)}`);
  });


  function isValidToken(token) {
    return token === variables.JAMBABOT_DEBUG_TOKEN || token === variables.JAMBABOT_PROD_TOKEN;
  }


  function startRTM() {
    slack.bot.startRTM((error) => {
      if (error) {
        console.warn('Failed to start RTM');
        setTimeout(startRTM, 60 * 1000);
        return;
      }

      console.info('RTM started!');
    });
  }

  slack.controller.on('rtm_close', startRTM);

  startRTM();

  slack.controller.hears('.*', ['direct_message', 'direct_mention', 'mention'], (botInstance, botMessage) => {
    const api = botInstance.api;

    api.users.info({ user: botMessage.user }, (error, usersInfoResponse) => {
      const user = usersInfoResponse.user;

      api.channels.info({ channel: botMessage.channel }, (errorChannels, channelsInfoResponse) => {
        api.groups.info({ channel: botMessage.channel }, (errorGroups, groupsInfoResponse) => {
          let channel;

          if (channelsInfoResponse.ok) {
            channel = channelsInfoResponse.channel.name;
          } else if (groupsInfoResponse.ok) {
            channel = groupsInfoResponse.group.name;
          } else if (botMessage.event === 'direct_message') {
            channel = 'allow';
          } else {
            channel = 'unknown';
          }

          const message = {
            channel,
            userName: user.name,
            firstName: user.profile.first_name,
            lastName: user.profile.last_name,
            userText: botMessage.text.replace(/\s+/g, ' ').trim(),
            preFormattedText: botMessage.text
          };

          console.info(message);

          parseCommand(message, (response) => {
            if (response) {
              botInstance.reply(botMessage, response);
            }
          });
        });
      });
    });
  });

  /*
   * Ensure that the express server will not keep running after close node
   */
  process.on('SIGTERM', () => {
    console.log('Stopping the server');
    server.close(() => { process.exit(0); });
  });
})();

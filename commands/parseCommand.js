const isValidCommand = require('./utils/isValidCommand');
const commands = require('./commands');

(() => {
  function parseCommand(message, callback) {
    commands.some((command) => {
      let match;

      if (command.acceptsPreFormattedText && message.preFormattedText) {
        match = message.preFormattedText.match(command.pattern);
      }

      if (!match) {
        match = message.userText.match(command.pattern);
      }

      if (match) {
        if (isValidCommand(command, message)) {
          const params = [message, callback];
          if (command.description.includes('silviao ajuda')) {
            params.push(commands);
          }

          command.handler.apply(this, params.concat(match.slice(1)));
        } else {
          callback('C fude kkkkk');
        }

        return true;
      }

      return false;
    });
  }

  module.exports = parseCommand;
})();

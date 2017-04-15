const isValidCommand = require('./utils/isValidCommand');

(() => {
  function help(message, callback, commands, invalidCommand) {
    let helpText;

    if (invalidCommand) {
      helpText = `Vixxxxxxxi... não entendi nada ..... "${invalidCommand}". Veja aii :\n>>>`;
    } else {
      helpText = 'Então o que me diz disso aiiii 2 :\n>>>';
    }

    commands.forEach((command) => {
      if (isValidCommand(command, message)) {
        helpText += `${command.description}\n`;
      }
    });


    callback(helpText);
  }

  module.exports = {
    pattern: /^ajuda$/,
    handler: help,
    description: '*silviao ajuda* : shows a list of valid commands',
    channels: undefined
  };
})();

const variables = require('../../variables');

module.exports = {
  protractorPedeAeConfig,
  protractorMenuConfig
};


function protractorPedeAeConfig(message, size, dish, garnish, salad, comment = '') {
  return baseTaskConfig({
    configFile: './integrations/ifood/protractor-pedeAe.conf.js',
    args: {
      params: {
        order: {
          size,
          dish,
          salad,
          garnish,
          comment
        },
        user: {
          userName: message.userName,
          firstName: message.firstName,
          lastName: message.lastName
        }
      }
    },
  });
}


function protractorMenuConfig() {
  return baseTaskConfig({
    configFile: './integrations/ifood/protractor-menu.conf.js'
  });
}

// TODO logins are not being passed
function baseTaskConfig(customConfig) {
  return Object.assign(
    {
      keepAlive: false,
      noColor: false,
      debug: false,
      nodeBin: 'node',
      output: false,
      outputOptions: {},
      webdriverManagerUpdate: true,
      args: {
        baseUrl: '',
        params: {
          login: {
            user: variables.IFOOD_ACCOUNT,
            password: variables.IFOOD_PASSWORD
          },
          envprod: !variables.JAMBABOT_DEBUG
        }
      }
    },
    customConfig
  );
}

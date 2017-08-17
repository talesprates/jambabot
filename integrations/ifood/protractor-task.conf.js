const { merge } = require('lodash');

const variables = require('../../variables');

const path = require('path');

module.exports = {
  protractorPedeAeConfig,
  protractorMenuConfig
};

let accountNumber = 0;

function protractorPedeAeConfig(message, size, dish, garnish, salad, user, comment = '') {
  return baseTaskConfig({
    configFile: path.join(path.dirname(require.main.filename), '/integrations/ifood/protractor-pedeAe.conf.js'),
    args: {
      params: {
        order: {
          size,
          dish,
          salad,
          garnish,
          user,
          comment
        },
        user: {
          userName: message.userName,
          firstName: message.firstName,
          lastName: message.lastName
        },
        accountNumber
      }
    },
  });
}


function protractorMenuConfig() {
  return baseTaskConfig({
    configFile: path.join(path.dirname(require.main.filename), '/integrations/ifood/protractor-menu.conf.js')
  });
}

function baseTaskConfig(customConfig) {
  accountNumber = (accountNumber + 1) % variables.IFOOD_ACCOUNTS_QTY;

  return merge(
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
          envprod: !variables.JAMBABOT_DEBUG,
          accountNumber
        }
      }
    },
    customConfig
  );
}


module.exports = function protractorTaskConf(message, size, dish, salad, garnish, comment = '') {
  return {
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
          user: 'fiaobot@gmail.com', // TODO take the login credentials from STDIN
          password: 'Fi@o1234'
        },
        envprod: false,
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
    configFile: './integrations/ifood/protractor.conf.js'
  };
};

const grunt = require('grunt');

require('./Gruntfile')(grunt);


module.exports = {
  pedir
};


function pedir(message, size, dish, salad, garnish, comment = '') {
  return new Promise((resolve, reject) => {
    grunt.config.set('protractor.ifood.options.args.params.order', {
      size,
      dish,
      salad,
      garnish,
      comment
    });

    grunt.config.set('protractor.ifood.options.args.params.user', {
      userName: message.userName,
      firstName: message.firstName,
      lastName: message.lastName
    });


    try {
      grunt.tasks(['protractor']);
      console.info('Pedido realizado');
      resolve();
    } catch (ex) {
      console.debug(ex);
      reject(ex);
    }
  });
}

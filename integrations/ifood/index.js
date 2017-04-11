const grunt = require('grunt');
const path = require('path');

//const gruntFile = require('./Gruntfile');



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
      //grunt.tasks(['protractor']);
      grunt.cli.tasks = ['protractor'];
      grunt.cli({
        gruntfile: path.join(__dirname, 'Gruntfile.js'),
        base: path.join(__dirname, '..', '..')
      });
      console.info('Pedido realizado');
      resolve();
    } catch (ex) {
      console.log(ex);
      reject(ex);
    }
  });
}

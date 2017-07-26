const mongodb = require('../integrations/mongodb');
const ifood = require('../integrations/ifood');

(() => {
  module.exports = {
    pattern: /^pede ae (minimini|mini|todasassaladas|executiva) de ([^,]*), ([^,]*), ([^,]*), as ([^,]*)(?:, (.*))?$/i,
    handler: pedeAe,
    description: '*silviao pede ae* : {size} de {dish}, {garnish}, {salad}, as {user}[, {comment}] ',
    channels: ['talito_do_jamba']
  };


  function pedeAe(message, callback, size, dish, garnish, salad, user, comment) {
    mongodb.isValidSize(size)
      .then(() => mongodb.isValidGarnish(size, garnish))
      .then(() => mongodb.isValidSalad(size, salad))
      .then(() => mongodb.isValidMenu(size, dish))
      .then(runAutomatedOrder)
      .then(callback)
      .catch(callback);

    runAutomatedOrder(message, callback, size, dish, garnish, salad, user, comment)
      .then(callback);


    function runAutomatedOrder() {
      console.log(
        'Prestes a chamar o ifood: size:',
        size,
        'dish:',
        dish,
        'salad:',
        salad,
        'garnish',
        garnish,
        'user',
        user,
        'comment',
        comment
      );
      return ifood.pedir(message, size, dish, garnish, salad, user, comment);
    }
  }
})();

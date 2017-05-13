const mongodb = require('../integrations/mongodb');
const ifood = require('../integrations/ifood');

(() => {
  module.exports = {
    pattern: /^pede ae (minimini|mini|todasassaladas|executiva) de ([^,]*), ([^,]*), ([^,]*)(?:, (.*))?$/i,
    handler: pedeAe,
    description: '*silviao pede ae* : {size} de {dish}, {garnish}, {salad}[, {comment}] ',
    channels: ['delicias-do-jamba', 'dev-delicias-do-jamba']
  };


  function pedeAe(message, callback, size, dish, garnish, salad, comment) {
    mongodb.isValidSize(size)
      .then(() => mongodb.isValidGarnish(size, garnish))
      .then(() => mongodb.isValidSalad(size, salad))
      .then(() => mongodb.isValidMenu(size, dish))
      .then(runAutomatedOrder)
      .then(callback)
      .catch(callback);


    function runAutomatedOrder() {
      console.log('Prestes a chamar o ifood: size: ', size, ' dish: ', dish, ' salad: ', salad, ' garnish ', garnish, ' comment ', comment);
      return ifood.pedir(message, size, dish, garnish, salad, comment);
    }
  }
})();

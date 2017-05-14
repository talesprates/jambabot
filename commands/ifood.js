const mongodb = require('../integrations/mongodb');

(() => {
  /* eslint global-require: 0 */
  function ifood(message, callback) {
    console.log('Prestes a chamar o ifood cardapio');
    console.log(message);
    return mongodb.getTodayMenu()
    .then(generateMenuMessage)
    .then(callback)
    .catch(callback);
  }

  function generateMenuMessage(menuStored) {
    const result = [];
    const menu = menuStored.menu;

    Object.keys(menu).forEach((key) => {
      const size = menu[key];
      result.push(`_*${key}*_`);
      result.push(`\t${size.dish.join(', ')}`);
      result.push('\t*guarnições:*');
      result.push(`\t${size.garnish.join(', ')}`);
      result.push('\t*saladas:*');
      result.push(`\t${size.salad.join(', ')}`);
      result.push('\n');
    });

    return result.join('\n');
  }

  module.exports = {
    pattern: /^ifood$/,
    handler: ifood,
    description: '*silviao ifood* : Gets today\'s ifood menu',
    channels: ['delicias-do-jamba', 'dev-delicias-do-jamba']
  };
})();

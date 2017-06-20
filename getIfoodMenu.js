#!/usr/bin/env node
const mongodb = require('./integrations/mongodb/');
const ifood = require('./integrations/ifood');

mongodb.getTodayMenu()
.then(() => {
  console.log('menu already stored.');
  process.exit(0);
})
.catch(() => {
  ifood.cardapio()
    .then((cardapio) => {
      mongodb.saveTodayMenu(cardapio)
        .then(() => {
          console.log('menu stored with sucess');
          process.exit(1);
        })
        .catch(() => {
          console.log('duplicate menu');
          process.exit(0);
        });
    })
    .catch(() => {
      console.log('failed to store the menu');
      process.exit(1);
    });
});

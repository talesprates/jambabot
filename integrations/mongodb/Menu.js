const mongoose = require('mongoose');

(() => {
  const menuSchema = mongoose.Schema({
    menu: Object,
    date: { type: String, required: true, unique: true }
  });

  const Menu = mongoose.model('Menu', menuSchema);

  function getTodayDate() {
    const todayDate = new Date();
    return `${todayDate.getDate()}/${todayDate.getMonth() + 1}`;
  }

  function getTodayMenu() {
    return new Promise((resolve, reject) => {
      const todayFormattedDate = getTodayDate();
      Menu.findOne({ date: todayFormattedDate }, (error, menuStored) => {
        if (menuStored == null || error) {
          reject('ifood não abriu ainda.');
          return;
        }

        resolve(menuStored);
      });
    });
  }

  function saveTodayMenu(menu) {
    return new Promise((resolve, reject) => {
      const todayFormattedDate = getTodayDate();
      Menu.create({ menu, date: todayFormattedDate }, (errorCreatingMenu) => {
        if (errorCreatingMenu) {
          reject(errorCreatingMenu);
          return;
        }
        resolve();
      });
    });
  }

  function isValidSize(size) {
    return new Promise((resolve, reject) => {
      getTodayMenu
        .then((menuFound) => {
          const menu = menuFound.menu;
          const found = Object.keys(menu).some(key => key === size);

          if (found) {
            resolve(true);
          } else {
            reject('Tamanho inválido');
          }
        })
        .catch(reject);
    });
  }

  function isValidGarnish(size, garnish) {
    return new Promise((resolve, reject) => {
      getTodayMenu
        .then((menuFound) => {
          const menu = menuFound.menu;
          const found = menu[size].garnish.some(element => element === garnish);

          if (found) {
            resolve(true);
          } else {
            reject('Guarnição inválida');
          }
        })
        .catch(reject);
    });
  }

  function isValidSalad(size, salad) {
    return new Promise((resolve, reject) => {
      getTodayMenu
        .then((menuFound) => {
          const menu = menuFound.menu;
          const found = menu[size].salad.some(element => element === salad);

          if (found) {
            resolve(true);
          } else {
            reject('Salada inválida');
          }
        })
        .catch(reject);
    });
  }

  function isValidDish(size, dish) {
    return new Promise((resolve, reject) => {
      getTodayMenu
        .then((menuFound) => {
          const menu = menuFound.menu;
          const found = menu[size].dish.some(element => element === dish);

          if (found) {
            resolve(true);
          } else {
            reject('Prato inválido');
          }
        })
        .catch(reject);
    });
  }

  module.exports = {
    getTodayMenu,
    saveTodayMenu,
    isValidSize,
    isValidGarnish,
    isValidSalad,
    isValidDish
  };
})();

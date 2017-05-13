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
    console.log('get today menu');

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
    console.log('save today menu');

    return new Promise((resolve, reject) => {
      const todayFormattedDate = getTodayDate();
      Menu.create({ menu, date: todayFormattedDate }, (errorCreatingMenu) => {
        if (errorCreatingMenu) {
          reject(errorCreatingMenu);
          return;
        }
        console.log('menu', menu, 'date', todayFormattedDate);
        resolve();
      });
    });
  }

  function isValidSize(size) {
    console.log('is valid size', size);

    return new Promise((resolve, reject) => {
      const todayFormattedDate = getTodayDate();
      Menu.findOne({ date: todayFormattedDate }, (error, menuFound) => {
        if (menuFound == null) {
          reject('ifood não abriu ainda.');
          return;
        }

        const menu = menuFound.menu;

        const found = Object.keys(menu).some(key => key === size);

        if (found) {
          resolve(true);
        } else {
          reject('Tamanho inválido');
        }
      });
    });
  }

  function isValidGarnish(size, garnish) {
    console.log('is valid garnish', size, garnish);

    return new Promise((resolve, reject) => {
      const todayFormattedDate = getTodayDate();
      Menu.findOne({ date: todayFormattedDate }, (error, menuFound) => {
        if (menuFound == null) {
          reject('ifood não abriu ainda.');
          return;
        }

        const menu = menuFound.menu;

        const found = menu[size].garnish.some(element => element === garnish);

        if (found) {
          resolve(true);
        } else {
          reject('Guarnição inválida');
        }
      });
    });
  }

  function isValidSalad(size, salad) {
    console.log('is valid garnish', size, salad);

    return new Promise((resolve, reject) => {
      const todayFormattedDate = getTodayDate();
      Menu.findOne({ date: todayFormattedDate }, (error, menuFound) => {
        if (error) {
          reject('ifood não abriu ainda.');
          return;
        }

        const menu = menuFound.menu;

        const found = menu[size].salad.some(element => element === salad);

        if (found) {
          resolve(true);
        } else {
          reject('Salada inválida');
        }
      });
    });
  }

  function isValidDish(size, dish) {
    console.log('is valid dish', size, dish);

    return new Promise((resolve, reject) => {
      const todayFormattedDate = getTodayDate();
      Menu.findOne({ date: todayFormattedDate }, (error, menuFound) => {
        if (error) {
          reject('ifood não abriu ainda.');
          return;
        }

        const menu = menuFound.menu;

        const found = menu[size].dish.some(element => element === dish);

        if (found) {
          resolve(true);
        } else {
          reject('Prato inválido');
        }
      });
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

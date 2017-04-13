const mongoose = require('mongoose');

(() => {
  const DishSchema = mongoose.Schema({
    dish: { type: String, unique: true }
  });
  const Dish = mongoose.model('Dish', DishSchema);

  function isValidDish(dish, callback) {
	  
    console.log('valid dish');	  
    const validCallback = callback || function noop() {};

    return new Promise((resolve, reject) => {
      Dish.findOne({ dish: dish.toLowerCase() }, (error, dishFound) => {
        if (error) {
          validCallback(error, undefined);
          reject(error);
          return;
        }

        validCallback(null, !!dishFound);
        resolve(!!dishFound);
      });
    });
  }

  function saveDishes(dishes, callback) {
    recursivelySaveDishes(dishes, 0, [], callback);
  }

  function recursivelySaveDishes(dishes, index, errors, callback) {
    if (index < dishes.length) {
      const dish = dishes[index];
      isValidDish(dish, (error, isAValidDish) => {
        if (error) {
          errors.push(error);
          recursivelySaveDishes(dishes, index + 1, errors, callback);
          return;
        }

        if (!isAValidDish) {
          Dish.create({ dish: dish.toLowerCase() }, (errorCreateDish) => {
            errors.push(errorCreateDish);
            recursivelySaveDishes(dishes, index + 1, errors, callback);
          });
        } else {
          errors.push(null);
          recursivelySaveDishes(dishes, index + 1, errors, callback);
        }
      });
    } else {
      callback(errors);
    }
  }

  module.exports = {
    isValidDish,
    saveDishes
  };
})();

const MenuPage = require('../../pages/MenuPage');
const ChooseDishPage = require('../../pages/ChooseDishPage');
const mongodb = require('../../../../integrations/mongodb');


describe('Get Today Menu', () => {
  const cardapio = {};


  after(function () {
    MenuPage.buttons.nextTab.click();
    waitElementVisible(MenuPage.fields.tab3);

    if (Object.keys(cardapio).length === 4) {
      process.send(cardapio);
    }
  });


  describe('Reads each dish, garnish, and salad from each size', () => {
    beforeEach(() => {
      browser.get(ChooseDishPage.url);
    });

    it('MARMITEX MINI', () => {
      cardapio.mini = baseDish();
      waitElementVisible(MenuPage.buttons.addMini)
        .then(e => e.click())
        .then(() => extractMenuForSize(cardapio.mini));
    });


    it('MARMITEX MINI mini', () => {
      cardapio.minimini = baseDish();
      waitElementVisible(MenuPage.buttons.addMinimini)
        .then(e => e.click())
        .then(() => extractMenuForSize(cardapio.minimini));
    });


    it('TODAS AS SALADAS', () => {
      cardapio.todasassaladas = baseDish();
      waitElementVisible(MenuPage.buttons.addTodasassaladas)
        .then(e => e.click())
        .then(() => extractMenuForSize(cardapio.todasassaladas));
    });


    it('MARMITEX EXECUTIVA', () => {
      cardapio.executiva = baseDish();
      waitElementVisible(MenuPage.buttons.addExecutiva)
        .then(e => e.click())
        .then(() => extractMenuForSize(cardapio.executiva));
    });


    function baseDish() {
      return { dish: [], garnish: [], salad: [] };
    }


    function extractMenuForSize(size) {
      waitElementVisible(MenuPage.buttons.addDish).then(e => e.click());
      waitElementVisible(MenuPage.fields.tab0);

      $$(MenuPage.fields.tab0).each((element) => {
        element.getText().then(text => size.dish.push(text));
        element.click();
      });

      MenuPage.buttons.nextTab.click();
      waitElementVisible(MenuPage.fields.tab1);

      $$(MenuPage.fields.tab1).each((element) => {
        element.getText().then(text => size.garnish.push(text));
        element.click();
      });

      MenuPage.buttons.nextTab.click();
      waitElementVisible(MenuPage.fields.tab2);

      $$(MenuPage.fields.tab2).each((element) => {
        element.getText().then(text => size.salad.push(text));
        element.click();
      });
    }
  });
});

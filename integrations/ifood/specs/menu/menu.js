const MenuPage = require('../../pages/MenuPage');
const ChooseDishPage = require('../../pages/ChooseDishPage');
const mongodb = require('../../../../integrations/mongodb');


describe('Get Today Menu', () => {
  const cardapio = {
    mini: { dish: [], garnish: [], salad: [] },
    minimini: { dish: [], garnish: [], salad: [] },
    todasassaladas: { dish: [], garnish: [], salad: [] },
    executiva: { dish: [], garnish: [], salad: [] }
  };


  after(() => {
    MenuPage.buttons.nextTab.click();
    waitElementVisible(MenuPage.fields.tab3);

    console.log(cardapio);

    mongodb.saveTodayMenu(cardapio)
      .then(() => console.log('menu created'))
      .catch(() => console.log('duplicate menu'));
  });


  describe('Reads each dish, garnish, and salad from each size and stores on mongodb', () => {
    beforeEach(() => {
      browser.get(ChooseDishPage.url);
    });

    it('MARMITEX MINI', () => {
      waitElementVisible(MenuPage.buttons.addMini)
        .then(e => e.click())
        .then(() => extractMenuForSize(cardapio.mini));
    });


    it('MARMITEX MINI mini', () => {
      waitElementVisible(MenuPage.buttons.addMinimini)
        .then(e => e.click())
        .then(() => extractMenuForSize(cardapio.minimini));
    });


    it('TODAS AS SALADAS', () => {
      waitElementVisible(MenuPage.buttons.addTodasassaladas)
        .then(e => e.click())
        .then(() => extractMenuForSize(cardapio.todasassaladas));
    });


    it('MARMITEX EXECUTIVA', () => {
      waitElementVisible(MenuPage.buttons.addExecutiva)
        .then(e => e.click())
        .then(() => extractMenuForSize(cardapio.executiva));
    });


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

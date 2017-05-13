const LoginPage = require('../../pages/LoginPage');
const MenuPage = require('../../pages/MenuPage');
const ChooseDishPage = require('../../pages/ChooseDishPage');
const mongodb = require('../../../../integrations/mongodb');

describe('Get Today Menu', () => {
  it('Reads each dish, garnish, and salad from each size and stores on mongodb', () => {
    browser.get(LoginPage.url);

    waitElementVisible(LoginPage.fields.email);

    LoginPage.fields.email.sendKeys(browser.params.login.user);
    LoginPage.fields.password.sendKeys(browser.params.login.password);

    LoginPage.buttons.login.click();

    expect(LoginPage.profilePicture.isPresent()).toBeTruthy();

    const cardapio = { minimini: { dish: [], garnish: [], salad: [] },
      mini: { dish: [], garnish: [], salad: [] },
      todasassaladas: { dish: [], garnish: [], salad: [] },
      executiva: { dish: [], garnish: [], salad: [] } };

    // MARMITEX MINI
    browser.get(ChooseDishPage.url);

    waitElementVisible(MenuPage.buttons.addMini).then(e => e.click());
    waitElementVisible(MenuPage.buttons.addDish).then(e => e.click());
    waitElementVisible(MenuPage.fields.tab0);

    $$(MenuPage.fields.tab0).each((element) => {
      element.getText().then((text) => {
        console.log(text);
        cardapio.mini.dish.push(text);
      });
      element.click();
    });

    MenuPage.buttons.nextTab.click();

    waitElementVisible(MenuPage.fields.tab1);

    $$(MenuPage.fields.tab1).each((element) => {
      element.getText().then((text) => {
        console.log(text);
        cardapio.mini.garnish.push(text);
      });
      element.click();
    });

    MenuPage.buttons.nextTab.click();

    waitElementVisible(MenuPage.fields.tab2);

    $$(MenuPage.fields.tab2).each((element) => {
      element.getText().then((text) => {
        console.log(text);
        cardapio.mini.salad.push(text);
      });
      element.click();
    });

    // MARMITEX MINI mini
    browser.get(ChooseDishPage.url);

    waitElementVisible(MenuPage.buttons.addMinimini).then(e => e.click());
    waitElementVisible(MenuPage.buttons.addDish).then(e => e.click());
    waitElementVisible(MenuPage.fields.tab0);

    $$(MenuPage.fields.tab0).each((element) => {
      element.getText().then((text) => {
        console.log(text);
        cardapio.minimini.dish.push(text);
      });
      element.click();
    });

    MenuPage.buttons.nextTab.click();

    waitElementVisible(MenuPage.fields.tab1);

    $$(MenuPage.fields.tab1).each((element) => {
      element.getText().then((text) => {
        console.log(text);
        cardapio.minimini.garnish.push(text);
      });
      element.click();
    });

    MenuPage.buttons.nextTab.click();

    waitElementVisible(MenuPage.fields.tab2);

    $$(MenuPage.fields.tab2).each((element) => {
      element.getText().then((text) => {
        console.log(text);
        cardapio.minimini.salad.push(text);
      });
      element.click();
    });

    // TODAS AS SALADAS
    browser.get(ChooseDishPage.url);

    waitElementVisible(MenuPage.buttons.addTodasassaladas).then(e => e.click());
    waitElementVisible(MenuPage.buttons.addDish).then(e => e.click());
    waitElementVisible(MenuPage.fields.tab0);

    $$(MenuPage.fields.tab0).each((element) => {
      element.getText().then((text) => {
        console.log(text);
        cardapio.todasassaladas.dish.push(text);
      });
      element.click();
    });

    MenuPage.buttons.nextTab.click();

    waitElementVisible(MenuPage.fields.tab1);

    $$(MenuPage.fields.tab1).each((element) => {
      element.getText().then((text) => {
        console.log(text);
        cardapio.todasassaladas.garnish.push(text);
      });
      element.click();
    });

    MenuPage.buttons.nextTab.click();

    waitElementVisible(MenuPage.fields.tab2);

    $$(MenuPage.fields.tab2).each((element) => {
      element.getText().then((text) => {
        console.log(text);
        cardapio.todasassaladas.salad.push(text);
      });
      element.click();
    });

    // MARMITEX EXECUTIVA
    browser.get(ChooseDishPage.url);

    waitElementVisible(MenuPage.buttons.addExecutiva).then(e => e.click());
    waitElementVisible(MenuPage.buttons.addDish).then(e => e.click());
    waitElementVisible(MenuPage.fields.tab0);

    $$(MenuPage.fields.tab0).each((element) => {
      element.getText().then((text) => {
        console.log(text);
        cardapio.executiva.dish.push(text);
      });
      element.click();
    });

    MenuPage.buttons.nextTab.click();

    waitElementVisible(MenuPage.fields.tab1);

    $$(MenuPage.fields.tab1).each((element) => {
      element.getText().then((text) => {
        console.log(text);
        cardapio.executiva.garnish.push(text);
      });
      element.click();
    });

    MenuPage.buttons.nextTab.click();

    waitElementVisible(MenuPage.fields.tab2);

    $$(MenuPage.fields.tab2).each((element) => {
      element.getText().then((text) => {
        console.log(text);
        cardapio.executiva.salad.push(text);
      });
      element.click();
    });

    MenuPage.buttons.nextTab.click();

    waitElementVisible(MenuPage.fields.tab3).then(() => {
      mongodb.saveTodayMenu(cardapio)
      .then(console.log('menu created'))
      .catch(console.log('duplicate menu'));
      console.log(cardapio);
    });
  });
});

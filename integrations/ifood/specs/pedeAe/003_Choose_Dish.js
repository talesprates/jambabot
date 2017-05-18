/* global element, By, browser, waitElementVisible */

const ChooseDishPage = require('../../pages/ChooseDishPage');

describe('Choose Dish', () => {
  it('Select the dish according to the user parameters', () => {
    browser.get(ChooseDishPage.url);

    const { dish, buttons } = ChooseDishPage;

    waitElementVisible(dish.tamanho).then(e => e.click());

    waitElementVisible(buttons.submitComment);

    if (dish.comentario) {
      ChooseDishPage.fields.commentArea.click().sendKeys(dish.comentario);
    }

    buttons.submitComment.click();

    waitElementVisible(ChooseDishPage.garnishTab);

    waitElementVisible(dish.prato).then(e => e.click());

    waitElementVisible(buttons.nextButton).then(e => e.click());

    waitElementVisible(dish.guarnicao).then(e => e.click());

    waitElementVisible(buttons.nextButton).then(e => e.click());

    waitElementVisible(dish.salada).then(e => e.click());

    waitElementVisible(buttons.nextButton).then(e => e.click());

    waitElementVisible(buttons.nextButton).then(e => e.click());

    waitElementVisible(buttons.nextButton).then(e => e.click());

    waitElementVisible(ChooseDishPage.fields.assertionSelector);

    browser.sleep(5000);
  });
});

xdescribe('Choose Dish (China in Box)', () => {
  it('Select the dish according to the user parameters', () => {
    const dish = 'SALADA CIB CAMARÃO';

    browser.get('https://www.ifood.com.br/delivery/campinas-sp/china-in-box---cambui-cambui');

    waitElementVisible($(`.verify[title*="${dish}"]`));

    $('.verify[title*="SALADA CIB CAMARÃO"]').click();

    browser.sleep(10000);

    // waitElementVisible($('#garnish'));

    // element(By.cssContainingText('strong.description', 'SEM MOLHO')).click();

    // $('#btn_0').click();

    // waitElementVisible($('div[title*="SALADA CIB CAMARÃO"'));
  });
});

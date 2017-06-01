const ChooseDishPage = require('../../pages/ChooseDishPage');

describe('Choose Dish', () => {
  it('Select the dish according to the user parameters', () => {
    browser.get(ChooseDishPage.url);

    const { order, buttons, fields } = ChooseDishPage;

    waitElementVisible(order.size).then(e => e.click());
    waitElementVisible(buttons.submitComment);

    if (order.comment) {
      fields.commentArea.click().sendKeys(order.comment);
    }

    buttons.submitComment.click();
    waitElementVisible(ChooseDishPage.garnishTab);
    waitElementVisible(order.dish).then(e => e.click());
    waitElementVisible(buttons.nextButton).then(e => e.click());
    waitElementVisible(order.garnish).then(e => e.click());
    waitElementVisible(buttons.nextButton).then(e => e.click());
    waitElementVisible(order.salad).then(e => e.click());
    waitElementVisible(buttons.nextButton).then(e => e.click());
    waitElementVisible(buttons.nextButton).then(e => e.click());
    waitElementVisible(buttons.nextButton).then(e => e.click());
    waitElementVisible(fields.assertionSelector);

    browser.sleep(5000);
  });
});

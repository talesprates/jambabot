const ChangeNamePage = require('../../pages/ChangeNamePage');

describe('Change Username', () => {
  // const { firstName, lastName } = browser.params.user;
  const user = browser.params.order.user;

  it('Replaces the account\'s old name for the current user ', () => {
    browser.get(ChangeNamePage.url);

    waitElementVisible(ChangeNamePage.fields.name);
    // ChangeNamePage.fields.name.clear().sendKeys(`${firstName} ${lastName}`);
    ChangeNamePage.fields.name.clear().sendKeys(user);
    ChangeNamePage.buttons.saveData.click();
    waitElementVisible(ChangeNamePage.buttons.closeModal);
  });
});

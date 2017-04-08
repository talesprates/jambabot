const ChangeNamePage = require('../pages/ChangeNamePage');

xdescribe('Change Username', () => {
  it('Replaces the account\'s old name for the current user ', () => {
    browser.get(ChangeNamePage.url);

    waitElementVisible(ChangeNamePage.fields.name);

    ChangeNamePage.fields.name.clear().sendKeys('Luciano Castro');
    ChangeNamePage.buttons.saveData.click();

    waitElementVisible(ChangeNamePage.buttons.closeModal);
  });
});

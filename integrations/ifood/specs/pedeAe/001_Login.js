const LoginPage = require('../../pages/LoginPage');

// let counter = 0;

describe('Try to Login', () => {
  it('Enter the username and password', () => {
    console.log('envprod', browser.params.envprod);

    browser.get(LoginPage.url);

    waitElementVisible(LoginPage.fields.email);

    // LoginPage.fields.email.sendKeys(browser.params.login.user.replace('@', `_${counter}@`));
    LoginPage.fields.email.sendKeys(browser.params.login.user);
    // counter += 1;
    LoginPage.fields.password.sendKeys(browser.params.login.password);

    LoginPage.buttons.login.click();

    LoginPage.profilePicture.isPresent().should.eventually.equal(true);
  });
});

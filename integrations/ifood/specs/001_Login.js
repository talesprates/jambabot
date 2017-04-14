const spawn = require('child_process').spawn;
const LoginPage = require('../pages/LoginPage');
// const ChooseDishPage = require('../pages/ChooseDishPage');

describe('Try to Login', () => {
  it('Enter the username and password', () => {
    browser.get(LoginPage.url);

    waitElementVisible(LoginPage.fields.email);

    LoginPage.fields.email.sendKeys(browser.params.login.user);
    LoginPage.fields.password.sendKeys(browser.params.login.password);

    LoginPage.buttons.login.click();

    expect(LoginPage.profilePicture.isPresent()).toBeTruthy();
  });
});

fdescribe('Test Function', () => {
  it('Function created in order to do protractor related tests', () => {
    const ls = spawn('ls', ['-l']);
    ls.stdout.on('data', (data) => {
      console.log(`${data} rf`);
    });
  });
});

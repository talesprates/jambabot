const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const phantomjs = require('phantomjs');

exports.config = {
  specs: [
    'specs/pedeAe/**/*.js',
  ],
  multiCapabilities: [
    {
      browserName: 'phantomjs',
      'phantomjs.binary.path': phantomjs.path,
      count: 1
    }
  ],
  framework: 'jasmine2',
  mochaOpts: {
    reporter: 'spec',
    timeout: 10000
  },
  onPrepare
      // seleniumAddress: 'http://localhost:4444/wd/hub', // grunt protractor launch protractor
};
// //////////////////////////////////////


function onPrepare() {
  browser.ignoreSynchronization = true;
  browser.driver.ignoreSynchronization = true;
  configChai();
  browser.manage().window().setSize(640, 480);
  global.waitElementVisible = waitElementVisible;
  global.waitElementDisapear = waitElementDisapear;
}


function configChai() {
  global.chai = chai;
  global.should = global.chai.should();
  global.chaiAsPromised = chaiAsPromised;
  global.chai.use(global.chaiAsPromised);
  global.jasmineExpect = global.expect;
  Object.defineProperty(
      protractor.promise.Promise.prototype,
      'should',
      Object.getOwnPropertyDescriptor(Object.prototype, 'should')
    );
}


function waitElementVisible(target) {
  const EC = protractor.ExpectedConditions;
  const elementTarget = getElement(target);
  return browser.wait(EC.visibilityOf(elementTarget), 10000).then(() => elementTarget);
}


function waitElementDisapear(target) {
  const EC = protractor.ExpectedConditions;
  const elementTarget = getElement(target);
  return browser.wait(EC.not(EC.visibilityOf(elementTarget)), 10000).then(() => elementTarget);
}


function getElement(target) {
  // When you pass the return of By()
  if (target.using) {
    return element(target);
  }

  if (typeof target === 'string') {
    return $(target);
  }

  // It is already the result of element(By()) or $()
  return target;
}

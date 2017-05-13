const path = require('path');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
const phantomjs = require('phantomjs');
const _ = require('lodash');

const variables = require('../../variables');

module.exports = protractorBaseConfig;


function protractorBaseConfig(customConfig) {
  return _.mergeWith(generateDefaultConfigs(), customConfig, mergeArrays);
}

function generateDefaultConfigs() {
  const configs = {
    specs: [], // should be passed every time
    multiCapabilities: [],
    // framework: 'jasmine2', // disabled because doesn't have after()
    framework: 'mocha',
    mochaOpts: {
      ui: 'bdd',
      reporter: 'spec',
      timeout: 60000
    },
    onPrepare
  };

  /*
   * Use chrome for local tests
   */
  if (variables.JAMBABOT_DEBUG) {
    configs.multiCapabilities.push({
      browserName: 'chrome',
      count: 1,
      chromeOptions: {
        // args: ['incognito'],
        prefs: {
          download: {
            prompt_for_download: false,
            directory_upgrade: true,
            default_directory: path.join('~', 'Downloads', process.pid.toString())
          }
        }
      }
    });
  } else {
    configs.multiCapabilities.push({
      browserName: 'phantomjs',
      'phantomjs.binary.path': phantomjs.path,
      count: 1
    });
  }

  return configs;
}


function mergeArrays(objValue, srcValue) {
  if (_.isArray(objValue)) {
    return objValue.concat(srcValue);
  }

  return undefined;
}


function onPrepare() {
  browser.ignoreSynchronization = true;
  browser.driver.ignoreSynchronization = true;
  configChai();
  browser.manage().window().setSize(1000, 900);
  global.waitElementVisible = waitElementVisible;
  global.waitElementDisapear = waitElementDisapear;
}


function configChai() {
  chai.use(chaiAsPromised);
  global.chai = chai;
  global.should = chai.should();
  global.assert = chai.assert;
  global.expect = chai.expect;

  Object.defineProperty(
    protractor.promise.Promise.prototype,
    'should',
    Object.getOwnPropertyDescriptor(Object.prototype, 'should')
  );
}

/**
 *
 * @param {String|ProtractorBy} target
 * @returns {Promise<ElementFinder>}
 */
function waitElementVisible(target) {
  const EC = protractor.ExpectedConditions;
  const elementTarget = getElement(target);
  return browser.wait(EC.visibilityOf(elementTarget), 10000).then(() => elementTarget);
}


/**
 *
 * @param {String|ProtractorBy} target
 * @returns {Promise<ElementFinder>}
 */
function waitElementDisapear(target) {
  const EC = protractor.ExpectedConditions;
  const elementTarget = getElement(target);
  return browser.wait(EC.not(EC.visibilityOf(elementTarget)), 10000).then(() => elementTarget);
}


/**
 * @param {String|ProtractorBy|ElementFinder} target
 * @returns {ElementFinder}
 */
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


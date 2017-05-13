const protractorBaseConfig = require('./protractor-base.config');

exports.config = protractorBaseConfig({
  specs: [
    'specs/pedeAe/001_Login.js',
    'specs/menu/**/*.js',
  ]
});

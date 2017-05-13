const protractorBaseConfig = require('./protractor-base.config');

exports.config = protractorBaseConfig({
  specs: [
    'specs/pedeAe/**/*.js',
  ]
});

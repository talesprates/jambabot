const protractorTaskConf = require('./protractor-task.conf');
const runner = require('./runner');

module.exports = {
  pedir,
  cardapio
};

function pedir(...params) {
  return new Promise((resolve, reject) => {
    const opts = protractorTaskConf.protractorPedeAeConfig(...params);
    runner(opts, resolve, reject);
  });
}

function cardapio() {
  return new Promise((resolve, reject) => {
    const opts = protractorTaskConf.protractorMenuConfig();
    runner(opts, resolve, reject);
  });
}

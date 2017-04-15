
const protractorTaskConf = require('./protractor-task.conf');
const runner = require('./runner');

module.exports = {
  pedir
};


function pedir(...params) {
  return new Promise((resolve, reject) => {
    const opts = protractorTaskConf(...params);
    runner(opts, resolve, reject);
  });
}

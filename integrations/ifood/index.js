const path = require('path');
const spawn = require('child_process').spawn;
const protractorTaskConf = require('./protractor-task.conf');

module.exports = {
  pedir
};


function pedir(...params) {
  return new Promise((resolve, reject) => {
    const protractorMainPath = require.resolve('protractor');
    const protractorBinPath = path.resolve(protractorMainPath, '../../bin/protractor');
    const webdriverManagerPath = path.resolve(protractorMainPath, '../../bin/webdriver-manager');

    const opts = protractorTaskConf(...params);

    const strArgs = ['seleniumAddress', 'seleniumServerJar', 'seleniumPort', 'baseUrl', 'rootElement', 'browser', 'chromeDriver', 'chromeOnly', 'directConnect', 'sauceUser', 'sauceKey', 'sauceSeleniumAddress', 'framework', 'frameworkPath', 'beforeLaunch', 'onPrepare', 'webDriverProxy'];
    const listArgs = ['specs', 'exclude', 'suite'];
    const boolArgs = ['includeStackTrace', 'verbose'];
    const objectArgs = ['params', 'capabilities', 'cucumberOpts', 'mochaOpts'];

    const cmd = [protractorBinPath, opts.configFile];
    const args = process.execArgv.concat(cmd).filter(a => !/inspect=|debug-brk/.test(a));

    if (opts.noColor) {
      args.push('--no-jasmineNodeOpts.showColors');
    }

    if (!opts.debug && opts.debug === true) {
      args.splice(1, 0, 'debug');
    }

    // Iterate over all supported arguments.
    strArgs.forEach((a) => {
      if (opts.args[a]) {
        args.push(`--${a}`, opts.args[a]);
      }
    });

    listArgs.forEach((a) => {
      if (opts.args[a]) {
        let arg = opts.args[a];
        if (arg instanceof Array) {
          arg = arg.join(',');
        }
        args.push(`--${a}`, arg);
      }
    });

    boolArgs.forEach((a) => {
      if (opts.args[a]) {
        args.push(`--${a}`);
      }
    });

    // Convert [object] to --[object].key1 val1 --[object].key2 val2 ....
    objectArgs.forEach((a) => {
      function convert(prefix, objOrig, args2) {
        let obj = objOrig;
        if (!obj) {
          return;
        }

        if (typeof obj === 'string') {
          obj = JSON.parse(obj);
        }

        Object.keys(obj).forEach((key) => {
          const val = obj[key];
          const type = typeof obj[key];

          if (type === 'object') {
            if (Array.isArray(val)) {
              // Add duplicates --[object].key val1 --[object].key val2 ...
              for (let i = 0; i < val.length; i += 1) {
                args2.push(`${prefix}.${key}`, val[i]);
              }
            } else {
              // Dig deeper
              convert(`${prefix}.${key}`, val, args2);
            }
          } else if (type === 'undefined' || type === 'function') {
            // Skip these types
          } else if (type === 'boolean') {
            // Add --[object].key
            if (val) {
              args2.push(`${prefix}.${key}`);
            } else {
              args2.push(`--no${prefix.substring(1)}.${key}`);
            }
          } else {
            // Add --[object].key value
            args2.push(`${prefix}.${key}`, val);
          }
        });
      }

      convert(`--${a}`, opts.args[a], args);
    });


    // Spawn protractor command
    const startProtractor = () => {
      console.log('Spawn node with arguments: ', args.join(' '));

      const child = spawn(opts.nodeBin, args);

      child.stdout.on('data', (data) => { console.log(`stdout: ${data}`); });
      child.stderr.on('data', (data) => { console.log(`stderr: ${data}`); });
      child.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
        if (!code) {
          resolve('Pedido feito???');
        } else {
          reject();
        }
      });

      try {
        process.stdin.pipe(child.stdin);
      } catch (e) {
        console.log('Non-fatal: stdin cannot be piped in this shell');
      }

      child.stdout.pipe(process.stdout);
      child.stderr.pipe(process.stderr);
    };


    try {
      if (opts.webdriverManagerUpdate) {
        console.log('webdriver-manager path: ', webdriverManagerPath);

        const updater = spawn(opts.nodeBin, [webdriverManagerPath, 'update']);
        updater.on('close', startProtractor);
      } else {
        startProtractor();
      }
    } catch (e) {
      console.log('Exception on startProtractor()', e);
      reject(e.message);
    }
  });
}

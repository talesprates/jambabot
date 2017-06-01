const path = require('path');
const cd = require('child_process');

const spawn = cd.spawn;

const protractorMainPath = require.resolve('protractor');
const protractorBinPath = path.resolve(protractorMainPath, '../../bin/protractor');
const webdriverManagerPath = path.resolve(protractorMainPath, '../../bin/webdriver-manager');

const strArgs = ['seleniumAddress', 'seleniumServerJar', 'seleniumPort', 'baseUrl', 'rootElement', 'browser', 'chromeDriver', 'chromeOnly', 'directConnect', 'sauceUser', 'sauceKey', 'sauceSeleniumAddress', 'framework', 'frameworkPath', 'beforeLaunch', 'onPrepare', 'webDriverProxy'];
const listArgs = ['specs', 'exclude', 'suite'];
const boolArgs = ['includeStackTrace', 'verbose'];
const objectArgs = ['params', 'capabilities', 'cucumberOpts', 'mochaOpts'];

module.exports = protractorRunner;


function protractorRunner(opts, resolve, reject) {
  const args = generateArgs(opts);

  try {
    if (opts.webdriverManagerUpdate) {
      const updater = spawn(opts.nodeBin, [webdriverManagerPath, 'update']);
      updater.on('close', startProtractor);
    } else {
      startProtractor();
    }
  } catch (e) {
    console.log('Exception on startProtractor(): ', e);
    reject(e.message);
  }


  function startProtractor() {
    console.log('Spawn protractor with arguments: ', args.join(' '));

    let protractorResult;
    const protractorProcess = cd.fork(protractorBinPath, args, {
      execArgv: generateForkExecArgs()
    });

    // protractorProcess.stdout.on('data', (data) => { console.log(`stdout: ${data}`); });
    // protractorProcess.stderr.on('data', (data) => { console.log(`stderr: ${data}`); });

    protractorProcess.on('message', (result) => {
      protractorResult = result;
    });

    protractorProcess.on('result', (result) => {
      console.log('message: ', result);
      // protractorResult = result;
    });

    protractorProcess.on('close', (code) => {
      console.log(`protractorProcess exited with code ${code}`);
      if (!code) {
        resolve(protractorResult);
      } else {
        reject('C fude. Kkkkkkkk');
      }
    });
  }
}

function generateForkExecArgs() {
  const execArgs = [];

  if (process.execArgv && process.execArgv.length) {
    const isDebugMode = process.execArgv.some(arg => /inspect=*|debug-brk/.test(arg));

    if (isDebugMode) {
      // execArgs.push('--inspect-brk');
    }
  }

  return execArgs;
}


function generateArgs(opts) {
  let args = process.execArgv.concat([opts.configFile]);
  args = args.filter(a => !/inspect=*|debug-brk/.test(a));

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

  return args;
}


const exec = require('child_process').exec;

const wait = async (ms = 1000) => {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve();
        }, ms);
    })
};

(async () => {
    exec('node ./receive.js');
    await wait(100);

    require('./send');
})();

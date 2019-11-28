
const be = require('benchmark-easy')();
const RPC = require('../../../src').RPC;
const rpc = RPC();

// 1000 times, 2.826 seconds, 353/s
const times = 1000;

const main = async (count) => {
	const result = await rpc.call('testFunc', count);
	times <= 100 && console.log(count, result);
};

be.start(main, times);
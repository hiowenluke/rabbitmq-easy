
const be = require('benchmark-easy')();
const RPC = require('../../../src').RPC;
const rpc = RPC();

const main = async (count) => {
	const result = await rpc.call('testFunc', count);
	// console.log(count, result);
};

// about 20 seconds, avg 300 ops/sec
be.start(main, 10000);

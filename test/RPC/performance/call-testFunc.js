
const be = require('benchmark-easy')();
const RPC = require('../../../src').RPC;
// const RPC = require('../../../src').RPC_low_perf;
const rpc = RPC();

const main = async (count) => {
	const result = await rpc.call('testFuncx', count);
	// console.log(count, result);
};

be.start(main, 100);

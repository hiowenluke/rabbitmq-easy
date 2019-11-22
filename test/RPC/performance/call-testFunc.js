
const check = require('../../__lib/check');
const RPC = require('../../../src').RPC;
const rpc = RPC();

const maxTimes = 10000;
let count = 0;

const main = async () => {
	count ++;

	const result = await rpc.call('testFunc', count);
	// console.log(count, result);
};

(async () => {
	const counter = () => {return count};
	check.start(counter, maxTimes);

	for (let i = 0; i < maxTimes; i ++) {
		await main();
	}
})();

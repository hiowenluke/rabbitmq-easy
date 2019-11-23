
const RPC = require('../../../src').RPC;
// const RPC = require('../../../src').RPC_low_perf;
const rpc = RPC();

const handler = async (index) => {
	return index;
};

const main = async () => {
	await rpc.listen('testFuncx', handler);
};

main();

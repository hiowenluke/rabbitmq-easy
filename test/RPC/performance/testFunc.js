
const RPC = require('../../../src').RPC;
const rpc = RPC();

const handler = async (index) => {
	return index;
};

const main = async () => {
	await rpc.listen('testFunc', handler);
};

main();

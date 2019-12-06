
const RPC = require('../../../src').RPC;
const rpc = RPC();

const handler = async (a1, a2) => {
	return undefined;
};

const main = async () => {
	await rpc.listen('rpc_test_return_undefined', handler);
};

main();

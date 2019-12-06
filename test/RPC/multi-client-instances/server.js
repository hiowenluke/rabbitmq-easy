
const RPC = require('../../../src').RPC;
const rpc = RPC();

const handler = async (a1, a2) => {
	return `${a1} ${a2}`;
};

const main = async () => {
	await rpc.listen('rpc_test_multi_client_instances', handler);
};

main();

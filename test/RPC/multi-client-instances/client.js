
const RPC = require('../../../src').RPC;
const rpc = RPC();

const main = async () => {
	const result = await rpc.call('rpc_test_multi_client_instances', 'hello', 'world');
	// console.log(result); // 'hello world'
};

main();

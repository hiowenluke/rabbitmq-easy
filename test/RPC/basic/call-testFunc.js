
const RPC = require('../../../src').RPC;
const rpc = RPC();

const main = async () => {
	const result = await rpc.call('testFunc3', 'hello', 'world');
	console.log(result);
};

main();

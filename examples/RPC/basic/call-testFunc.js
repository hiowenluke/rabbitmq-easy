
const RPC = require('../../../src').RPC;
const rpc = RPC();

const main = async () => {
	const result = await rpc.call('testFunc', 'hello', 'world');
	console.log(result); // 'hello world'
};

main();

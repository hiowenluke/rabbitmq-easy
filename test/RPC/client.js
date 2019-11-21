
const RPC = require('../../src').RPC;
const rpc = RPC();

const main = async () => {
	const result = await rpc.client('testFunc', 'hello', 'world');
	console.log(result);
};

main();

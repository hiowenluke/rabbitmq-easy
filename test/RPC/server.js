
const RPC = require('../../src').RPC;
const rpc = RPC();

const handler = async (a1, a2) => {
	console.log(a1, a2);
	return {a: 1};
};

const main = async () => {

	// Tell MQ to call handler when there is a new message
	await rpc.listen('testFunc', handler);
};

main();

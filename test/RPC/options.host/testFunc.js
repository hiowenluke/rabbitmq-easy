
const RPC = require('../../../src').RPC;
const rpc = RPC({host: '127.0.0.1'});

const handler = async (a1, a2) => {
	console.log(a1, a2);
	return {a: 1};
};

const main = async () => {
	await rpc.listen('testFunc_host', handler);
};

main();


const RPC = require('../../src').RPC;
const rpc = RPC();

const handler = async (message) => {
	console.log(message);
	return {ok: true};
};

const main = async () => {

	// Tell MQ to call handler when there is a new message
	await rpc.server('testFunc', handler);
};

main();

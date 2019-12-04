
const RPC = require('../../../src').RPC;
const rpc = RPC({rabbitMQ: {host: '127.0.0.1'}});

const handler = async (a1) => {
	return `${a1}`;
};

const main = async () => {
	await rpc.listen('rpc_test_options.host', handler);
};

main();

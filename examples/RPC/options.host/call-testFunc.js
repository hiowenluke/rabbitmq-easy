
const RPC = require('../../../src').RPC;
const rpc = RPC({rabbitMQ: {host: '127.0.0.1'}});

const main = async () => {
	const result = await rpc.call('testFunc_host', 'hello', 'world');
	console.log(result); // 'hello world'
};

main();

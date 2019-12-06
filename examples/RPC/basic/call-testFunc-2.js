
// This file is another instance of client "testFunc".
// It can run simultaneously with "call-testFunc.js" without affecting each other.

const RPC = require('../../../src').RPC;
const rpc = RPC();

const main = async () => {
	const result = await rpc.call('testFunc', 'hello', 'world');
	console.log(result); // 'hello world'
};

main();

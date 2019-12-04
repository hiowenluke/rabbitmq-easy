
const RPC = require('../../../src').RPC;
const rpc = RPC();

const handler = async (a1, a2) => {
	return `${a1} ${a2}`;
};

const main = async () => {
	await rpc.listen('testFunc', handler);
};

main();

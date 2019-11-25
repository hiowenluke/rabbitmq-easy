
const MQ = require('../../../src').MQ;
const mq = MQ();

const handler1 = async (message) => {
	console.log('[1]', message);
};

const handler2 = async (message) => {
	console.log('[2]', message);
};

const main = async () => {
	await mq.receive('qx1', handler1);
	await mq.receive('qx2', handler2);
};

main();


const MQ = require('../../../src').MQ;
const mq = MQ();

const handler = async (message) => {
	console.log('[1]', message);
};

const handler2 = async (message) => {
	console.log('[2]', message);
};

const main = async () => {

	// Tell MQ to call handler when there is a new message
	await mq.receive('qx1', handler);
	await mq.receive('qx2', handler2);
};

main();

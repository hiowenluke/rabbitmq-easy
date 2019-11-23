
const MQ = require('../../../src').MQ;

const queue = 'q2';
const mq = MQ(queue);

const handler = async (message) => {
	// console.log(message);
};

const main = async () => {
	await mq.receive(handler);
};

main();

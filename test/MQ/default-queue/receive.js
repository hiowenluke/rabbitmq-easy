
const MQ = require('../../../src').MQ;
const mq = MQ();

const handler = async (message) => {
	console.log(message);
};

const main = async () => {
	await mq.receive(handler);
};

main();

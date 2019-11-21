
const MQ = require('../../../src').MQ;
const mq = MQ();

const handler = async (message) => {
	console.log(message);
};

const main = async () => {

	// Tell MQ to call handler when there is a new message
	await mq.receive(handler);
};

main();

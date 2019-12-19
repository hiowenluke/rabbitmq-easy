
const MQ = require('../src');

const queue = 'q1';
const mq = MQ(queue);

const handler = async (message) => {
	console.log(message);
};

const main = async () => {

	// Tell MQ to call handler when there is a new message
	await mq.receive(handler);
};

main();

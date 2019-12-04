
const MQ = require('../../../src').MQ;

const queue = 'q_host';
const mq = MQ(queue, {rabbitMQ: {host: 'localhost'}});

const handler = async (message) => {
	console.log(message);
};

const main = async () => {

	// Tell MQ to call handler when there is a new message
	await mq.receive(handler);
};

main();


const rabbitMQ = require('../../src');

const queue = 'q1';
const mq = rabbitMQ(queue);

const handler = async (message) => {
	console.log(message);
};

const main = async () => {

	// Tell rabbitmq to call handler when there is a new message
	await mq.receive(handler);
};

main();

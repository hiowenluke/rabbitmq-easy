
const rabbitMQ = require('../../src');
const mq = rabbitMQ();

const handler = async (message) => {
	console.log(message);
};

const main = async () => {

	// Tell rabbitmq to call handler when there is a new message
	await mq.receive(handler);
};

main();
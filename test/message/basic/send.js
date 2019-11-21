
const rabbitMQ = require('../../src');

const queue = 'q1';
const mq = rabbitMQ(queue);

const main = async () => {

	// Tell rabbitmq to send a message
	await mq.send('hello world');
};

main();

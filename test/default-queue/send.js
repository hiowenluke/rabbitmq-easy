
const rabbitMQ = require('../../src');
const mq = rabbitMQ();

const main = async () => {

	// Tell rabbitmq to send a message
	await mq.send('hello world');
};

main();

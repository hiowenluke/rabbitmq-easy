
const rabbitMQ = require('../../src');
const mq = rabbitMQ();

const main = async () => {

	// Tell rabbitmq to send a message
	await mq.send('qx1', 'hi qx1');
	await mq.send('qx2', 'hi qx2');
};

main();

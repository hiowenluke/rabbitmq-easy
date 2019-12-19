
const MQ = require('../../src');

const queue = 'q_host';
const mq = MQ(queue, {rabbitMQ: {host: 'localhost'}});

const main = async () => {

	// Tell MQ to send a message
	await mq.send('hello world');
};

main();

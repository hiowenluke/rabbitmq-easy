
const MQ = require('../../src');

const queue = 'q1';
const mq = MQ(queue);

const main = async () => {

	// Tell MQ to send a message
	await mq.send('hello world');
};

main();

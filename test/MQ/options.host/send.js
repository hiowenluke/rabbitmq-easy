
const MQ = require('../../../src').MQ;

const queue = 'q_host';
const mq = MQ(queue, {host: 'localhost'});

const main = async () => {

	// Tell MQ to send a message
	await mq.send('hello world');
};

main();

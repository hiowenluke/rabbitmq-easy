
const MQ = require('../../../src').MQ;
const mq = MQ();

const main = async () => {

	// Tell MQ to send a message
	await mq.send('hello world');
};

main();

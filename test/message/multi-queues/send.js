
const MQ = require('../../../src').MQ;
const mq = MQ();

const main = async () => {

	// Tell MQ to send a message
	await mq.send('qx1', 'hi qx1');
	await mq.send('qx2', 'hi qx2');
};

main();

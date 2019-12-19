
const MQ = require('../../src');
const mq = MQ();

const main = async () => {
	await mq.send('qx1', 'hi qx1');
	await mq.send('qx2', 'hi qx2');
};

main();


const MQ = require('../../../src').MQ;
const mq = MQ();

const main = async () => {
	await mq.send('hello world');
};

main();

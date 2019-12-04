
const MQ = require('../../../src').MQ;
const queue = 'test_basic_queue';
const mq = MQ(queue);

const main = async () => {
	await mq.send('hello world');
};

main();

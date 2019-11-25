
const be = require('benchmark-easy')();
const MQ = require('../../../src').MQ;

const queue = 'q2';
const mq = MQ(queue);

const main = async (count) => {
	await mq.send(`hi ${count}`);
};

// about 10 - 20 seconds, avg 61098 ops/sec
be.start(main, 1000000);


const be = require('benchmark-easy')();
const MQ = require('../../../src').MQ;

const queue = 'q2';
const mq = MQ(queue);

const main = async (count) => {
	await mq.send(`hi ${count}`);
};

// 1000000 times, 9.325 seconds, 107238/s
be.start(main, 1000000);

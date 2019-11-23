
const be = require('benchmark-easy')();
const MQ = require('../../../src').MQ;

const queue = 'q2';
const mq = MQ(queue);

let c = 0;
const main = async (count) => {
	// console.log(++ c);
	await mq.send(`hi ${count}`);
};

be.start(main, 10);

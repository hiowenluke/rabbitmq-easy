
const check = require('../../__lib/check');
const MQ = require('../../../src').MQ;

const queue = 'q2';
const mq = MQ(queue);

const times = 100000;
let count = 0;

const main = async () => {
	count ++;
	await mq.send(`hi ${count}`);
};

(async () => {
	const counter = () => {return count};
	check.start(counter);

	for (let i = 0; i < times; i ++) {
		await main();
	}
})();


const check = require('./__check');
const rabbitMQ = require('../../src');

const queue = 'q2';
const mq = rabbitMQ(queue);

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


const check = require('./__check');
const MQ = require('../../../src').MQ;

const queue = 'q2';
const mq = MQ(queue);

let count = 0;

const handler = async (message) => {
	// console.log(message);
	count ++;
};

const main = async () => {
	await mq.receive(handler);
};

(async () => {
	const counter = () => {return count};
	check.start(counter);

	await main();
})();

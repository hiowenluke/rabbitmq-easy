
const MQ = require('../../src');
const mq = MQ();

const handler = async (message) => {
	console.log(message);
};

const main = async () => {
	await mq.receive(handler);
};

main();

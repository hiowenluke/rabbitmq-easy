
const MQ = require('../../src');
const mq = MQ();

const main = async () => {
	await mq.send('hello world');
};

main();

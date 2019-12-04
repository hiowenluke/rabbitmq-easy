
const MQ = require('../../../src').MQ;
const mq = MQ({rabbitMQ: {host: '127.0.0.1'}});

const main = async () => {
	await mq.send('hello world');
};

main();

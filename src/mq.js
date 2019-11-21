
const connect = require('./connect');
const lib = require('./__lib');

const me = {
	host: 'localhost',
	queue: 'mq-default',

	init(queue, host) {
		this.queue = queue || this.queue;
		this.host = host || this.host;
	},

	parseArgs(queue, anotherArg) {

		// send()
		if (!queue) {
			throw new Error('Wrong arguments');
		}

		// send('hi')
		if (!anotherArg) {
			anotherArg = queue;
			queue = this.queue;
		}
		else {
			// send('queue', 'hi')
			// do nothing
		}

		return [queue, anotherArg];
	},

	async send(queue, message) {
		([queue, message] = this.parseArgs(queue, message));
		const {host} = this;

		try {
			const channel = await connect.do(host, queue, {durable: false});
			channel.sendToQueue(queue, Buffer.from(message), {persistent: true});
			channel.close();
		}
		catch(err) {
			console.error(err);
			connect.redo(host, queue);
		}
	},

	async receive(queue, handler) {
		([queue, handler] = this.parseArgs(queue, handler));
		const {host} = this;

		try {
			const channel = await connect.do(host, queue, {durable: false});
			channel.consume(queue, async (msg) => {
				await handler(msg.content.toString());
				channel.ack(msg);
			});
		}
		catch(err) {
			console.error(err);
			connect.redo(host, queue);
		}
	}
};

const create = (...args) => {
	return lib.create(me, ...args);
};

module.exports = create;

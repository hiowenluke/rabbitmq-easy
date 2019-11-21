
const connect = require('./connect');
const lib = require('./__lib');

const me = {
	host: 'localhost',
	queue: 'default',

	options: {
		// When RabbitMQ restarts, these messages are saved to disk.
		persistent: true,
		durable: false,
	},

	init(queue, host, options) {
		this.queue = queue || this.queue;
		this.host = host || this.host;
		Object.assign(this.options, options);
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
		const {host, options} = this;

		try {
			const channel = await connect.do(host, queue, options);
			channel.sendToQueue(queue, Buffer.from(message), options);
			channel.close();
		}
		catch(err) {
			console.error(err);
			connect.redo(host, queue);
		}
	},

	async receive(queue, handler) {
		([queue, handler] = this.parseArgs(queue, handler));
		const {host, options} = this;

		try {
			const channel = await connect.do(host, queue, options);
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

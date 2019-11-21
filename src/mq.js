
const connect = require('./connect');
const lib = require('./__lib');

const main = {
	host: 'localhost',
	queue: 'default',

	options: {
		// When RabbitMQ restarts, these messages are saved to disk.
		persistent: true //
	},

	init(queue, host, options) {
		queue && (this.queue = queue);
		host && (this.host = host);
		options && Object.assign(this.options, options);
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
			const channel = await connect.do(host, queue);
			await channel.sendToQueue(queue, Buffer.from(message), options);
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
			const channel = await connect.do(host, queue);
			await channel.consume(queue, async (message) => {
				await handler(message.content.toString());
				channel.ack(message);
			});
		}
		catch(err) {
			console.error(err);
			connect.redo(host, queue);
		}
	}
};

const create = (queue, host, options) => {

	// create()
	if (!queue) {
		// do nothing
	}
	else

	// create({queue, host, options})
	if (typeof queue === 'object') {
		({queue, host, options} = queue);
	}
	else {
		// create(queue, options)
		if (typeof host === 'object') {
			options = host;
			host = null;
		}
		else {
			// create(queue, host, ...)
			// do nothing
		}
	}

	const inst = Object.create(main);
	inst.init(queue, host, options);
	return inst;
};

module.exports = create;

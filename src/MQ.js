
const connect = require('./connect');

const me = {
	rabbitMQ: {
		host: 'localhost',
	},

	queue: 'mq-default',

	init(queue, options = {}) {
		if (typeof queue === 'object') {
			options = queue;
			queue = null;
		}

		queue && (this.queue = queue);
		Object.assign(this.rabbitMQ, options.rabbitMQ);
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
		const {host} = this.rabbitMQ;

		try {
			const channel = await connect.do(host, queue, {durable: false});
			channel.sendToQueue(queue, Buffer.from(message), {persistent: true});
		}
		catch(err) {
			console.error(err);
			connect.redo(host, queue);
		}
	},

	async receive(queue, handler) {
		([queue, handler] = this.parseArgs(queue, handler));
		const {host} = this.rabbitMQ;

		try {
			// Set options.isReCreate as true to remove queue created before
			const channel = await connect.do(host, queue, {durable: false, isReCreate: true});
			channel.consume(queue, async (msg) => {
				if (!msg) return;
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
	const inst = Object.create(me);
	inst.init && inst.init(...args);
	return inst;
};

module.exports = create;

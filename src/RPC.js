
const ID = require('fast-id')(100000);
const connect = require('./connect');
const lib = require('./__lib');

const UNDEFINED = '__undefined__';

const tools = {
	fixResult(result) {
		const type = typeof result;
		const invalidTypes = ['function', 'date'];

		if (type === 'undefined') {
			result = UNDEFINED;
		}
		else
		if (invalidTypes.indexOf(type) >= 0) {
			result = "{}";
		}
		else {
			result = JSON.stringify(result);
		}

		return result;
	}
};

const me = {
	host: 'localhost',
	queue: 'rpc-default',

	init(queue, host) {
		this.queue = queue || this.queue;
		this.host = host || this.host;
	},

	async call(queue, ...args) {
		const {host} = this;

		try {
			const channel = await connect.do(host, queue, {durable: false});
			channel.sendToQueue(queue, Buffer.from(message));

			return new Promise(async (resolve) => {
				const timeStamp = new Date().getTime();
				const q = 't';
				const channel = await connect.do(host, q, {exclusive: true});

				channel.consume(q, (msg) => {
					const result = msg.content.toString();
					resolve(result === UNDEFINED ? undefined : JSON.parse(result));
				});

				channel.sendToQueue(queue, Buffer.from(JSON.stringify(args)), {durable: false});
			})
		}
		catch(err) {
			console.error(err);
		}
	},

	async listen(queue, handler) {
		const {host} = this;

		try {
			const channel = await connect.do(host, queue, {durable: false});

			return channel.consume(queue, async (msg) => {
				const message = msg.content.toString();
				const args = JSON.parse(message);

				let result = await handler(...args);
				result = tools.fixResult(result);

				channel.sendToQueue(
					msg.properties.replyTo,
					Buffer.from(result),
					{correlationId: msg.properties.correlationId}
				);

				channel.ack(msg);
			});
		}
		catch(err) {
			console.error(err);
		}
	}
};

const create = (...args) => {
	return lib.create(me, ...args);
};

module.exports = create;

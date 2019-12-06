
const uuid = require('uuid');
const connect = require('./connect');

const myJson = {
	UNDEFINED: '__undefined__',

	stringify(result) {
		const type = typeof result;
		const invalidTypes = ['function', 'date'];

		if (type === 'undefined') {
			result = this.UNDEFINED;
		}
		else
		if (invalidTypes.indexOf(type) >= 0) {
			result = "{}";
		}
		else {
			result = JSON.stringify(result);
		}

		return result;
	},

	parse(message) {
		if (message === this.UNDEFINED) {
			return undefined;
		}
		else {
			return JSON.parse(message);
		}
	}
};

const me = {
	rabbitMQ: {
		host: 'localhost',
	},

	init(options = {}) {
		Object.assign(this.rabbitMQ, options.rabbitMQ);
	},

	async call(queue, ...args) {
		const {host} = this.rabbitMQ;

		try {
			const channel = await connect.do(host, queue, {durable: false});

			return new Promise(async (resolve) => {
				const corrId = uuid();

				const ok = await channel.assertQueue('', {exclusive: true});
				const q = ok.queue;

				channel.consume(q, (msg) => {
					if (msg.properties.correlationId === corrId) {
						const message = msg.content.toString();
						const result = myJson.parse(message);
						resolve(result);
					}

				}, {noAck: true});

				channel.sendToQueue(queue, Buffer.from(JSON.stringify(args)), {
					correlationId: corrId, replyTo: q
				});
			})
		}
		catch(err) {
			console.error(err);
		}
	},

	async listen(queue, handler) {
		const {host} = this.rabbitMQ;

		try {
			const channel = await connect.do(host, queue, {durable: false});
			channel.prefetch(1);

			return channel.consume(queue, async (msg) => {
				const message = msg.content.toString();
				const args = JSON.parse(message);

				const result = await handler(...args);
				const resultStr = myJson.stringify(result);

				channel.sendToQueue(
					msg.properties.replyTo,
					Buffer.from(resultStr),
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
	const inst = Object.create(me);
	inst.init && inst.init(...args);
	return inst;
};

module.exports = create;


const amqp = require("amqplib");
const uuid = require('uuid');
const connect = require('./connect');
const lib = require('./__lib');

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
			const connection = await amqp.connect(`amqp://${host}`);
			console.info(`connect to RabbitMQ ${host} success`);

			const channel = await connection.createChannel();

			return new Promise(async (resolve) => {
				const corrId = uuid();

				const ok = await channel.assertQueue('', {exclusive: true});
				const q = ok.queue;

				channel.consume(q, (msg) => {
					if (msg.properties.correlationId === corrId) {
						const message = msg.content.toString();
						resolve(JSON.parse(message));
					}

				}, {noAck: true});

				channel.sendToQueue(queue, Buffer.from(JSON.stringify(args)), {
					correlationId: corrId, replyTo: q
				});
			});
		}
		catch(err) {
			console.error(err);
			connect.redo(host, queue);
		}
	},

	async listen(queue, handler) {
		const {host} = this;

		try {
			const connection = await amqp.connect(`amqp://${host}`);
			console.info(`connect to RabbitMQ ${host} success`);

			process.once('SIGINT', () => { connection.close(); });

			const channel = await connection.createChannel();
			channel.assertQueue(queue, {durable: false});
			channel.prefetch(1);

			return channel.consume(queue, async (msg) => {
				const message = msg.content.toString();
				const args = JSON.parse(message);
				const result = await handler(...args);

				channel.sendToQueue(
					msg.properties.replyTo,
					Buffer.from(JSON.stringify(result)),
					{correlationId: msg.properties.correlationId}
				);

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

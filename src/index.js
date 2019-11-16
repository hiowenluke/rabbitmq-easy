
const amqp = require("amqplib");
const waitTime = 10 * 1000;

const connections = {
	data: {},

	async fetch(host, queue) {
		let connection;

		if (!this.data[host]) {
			connection = await amqp.connect(`amqp://${host}`);
			console.info(`connect to RabbitMQ ${host} success`);

			connection.on("error", (err) => {
				console.log(err);
				connect.redo(host, queue);
			});

			connection.on("close", () => {
				console.error(`connection to RabbitMQ ${host} closed`);
				connect.redo(host, queue);
			});

			this.data[host] = connection;
		}
		else {
			connection = this.data[host];
		}

		return connection;
	}
};

const channels = {
	data: {},

	async fetch(connection, host, queue) {
		const key = host + '|' + queue;
		let channel;

		if (!this.data[key]) {
			channel = await connection.createChannel();
			await channel.assertQueue(queue);
			this.data[key] = channel;
		}
		else {
			channel = this.data[key];
		}

		return channel;
	}
};

const connect = {
	async do(host, queue) {
		const connection = await connections.fetch(host, queue);
		const channel = await channels.fetch(connection, host, queue);
		return channel;
	},

	redo(host, queue) {
		setTimeout(async () => {
			await this.do(host, queue);
		}, waitTime);
	}
};

const main = {
	host: 'localhost',
	queue: 'default',

	options: {
		// When RabbitMQ restarts, these messages are saved to disk.
		persistent: true //
	},

	init(queue, host, options) {
		this.queue = queue;
		host && (this.host = host);
		options && Object.assign(this.options, options);
	},

	async send(message) {
		const {host, queue, options} = this;

		try {
			const channel = await connect.do(host, queue);
			await channel.sendToQueue(queue, Buffer.from(message), options);
		}
		catch(err) {
			console.error(err);
			connect.redo(host, queue);
		}
	},

	async receive(handler) {
		const {host, queue} = this;

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

	// init({queue, host, options})
	if (typeof queue === 'object') {
		({queue, host, options} = queue);
	}
	else {
		// init(queue, options)
		if (typeof host === 'object') {
			options = host;
			host = null;
		}
		else {
			// init(queue, host, ...)
			// do nothing
		}
	}

	const inst = Object.create(main);
	inst.init(queue, host, options);
	return inst;
};

module.exports = create;


const amqp = require("amqplib");
const waitTime = 10 * 1000;

const channels = {
	data: {},

	async fetch(connection, host, queue) {
		const key = host + '|' + queue;

		if (!this.data[key]) {
			this.data[key] = await this.create(connection, queue);
		}

		return this.data[key];
	},

	async create(connection, queue) {
		const channel = await connection.createChannel();
		await channel.assertQueue(queue, {durable: false});
		return channel;
	}
};

const connections = {
	data: {},

	async fetch(host, queue) {
		const key = host;

		if (!this.data[key]) {
			this.data[key] = await this.create(host, queue);
		}

		return this.data[key];
	},

	async create(host, queue) {
		const connection = await amqp.connect(`amqp://${host}`);
		console.info(`connect to RabbitMQ ${host} success`);

		process.once('SIGINT', () => {connection.close()});

		connection.on("error", (err) => {
			console.log(err);
			connect.redo(host, queue);
		});

		connection.on("close", () => {
			console.log(`connection to RabbitMQ ${host} closed`);
		});

		return connection;
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

module.exports = connect;
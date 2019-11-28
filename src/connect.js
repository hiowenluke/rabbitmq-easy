
const amqp = require("amqplib");
const config = require('./config');

const channels = {
	data: {},

	async fetch(connection, host, queue, options) {
		const key = host + '|' + queue;

		if (options.isReCreate || !this.data[key]) {
			this.data[key] = await this.create(connection, queue, options);
		}

		return this.data[key];
	},

	async create(connection, queue, options) {
		const channel = await connection.createChannel();

		if (options.isReCreate) {
			await channel.deleteQueue(queue);
		}

		await channel.assertQueue(queue, options);
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
		// console.info(`connect to RabbitMQ ${host} success`);

		process.once('SIGINT', () => {connection.close()});

		connection.on("error", (err) => {
			console.log(err);
			connect.redo(host, queue);
		});

		connection.on("close", () => {
			// console.log(`connection to RabbitMQ ${host} closed`);
		});

		return connection;
	}
};

const connect = {
	async do(host, queue, options) {
		const connection = await connections.fetch(host, queue);
		const channel = await channels.fetch(connection, host, queue, options);
		return channel;
	},

	redo(host, queue) {
		setTimeout(async () => {
			await this.do(host, queue);
		}, config.waitTime);
	}
};

module.exports = connect;

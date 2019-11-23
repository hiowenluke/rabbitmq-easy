
const ID = require('fast-id')(1000000);
const connect = require('./connect');
const lib = require('./__lib');

const UNDEFINED = '__undefined__';

const tools = {
	toJsonStr(result) {
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

			return new Promise(async (resolve) => {
				const id = ID();
				const q = queue + '_result_' + id;

				const ch = await connect.do(host, q);
				ch.consume(q, (msg) => {
					// ch.close();

					const result = msg.content.toString();
					resolve(result === UNDEFINED ? undefined : JSON.parse(result));
				});

				channel.sendToQueue(queue, Buffer.from(q + '##' + JSON.stringify(args)));
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

			channel.consume(queue, async (msg) => {
				let message = msg.content.toString();
				// console.log(message);

				const q = message.match(/^(.*?)##/)[1];
				message = message.substr(q.length + 2);

				const args = JSON.parse(message);
				const result = await handler(...args);

				const resultStr = tools.toJsonStr(result);
				channel.sendToQueue(q, Buffer.from(resultStr));

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

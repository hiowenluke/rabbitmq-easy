
const events = require('events');
const emitter = new events.EventEmitter();

const connect = require('./connect');
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
	},

	parseMessage(message) {
		const requestId = message.match(/^(.*?)#/)[1];
		message = message.substr(requestId.length + 1);
		return [requestId, message];
	}
};

const me = {
	host: 'localhost',
	transfers: {},
	requestIds: {},

	init({host} = {}) {
		this.host = host || this.host;
	},

	async createTransfer(queue) {
		const {host} = this;

		const chForResult = await connect.do(host, queue + '_result', {durable: true});
		chForResult.consume(queue + '_result', async (msg) => {
			let message = msg.content.toString();
			chForResult.ack(msg);

			let requestId;
			([requestId, message] = tools.parseMessage(message));

			const result = JSON.parse(message);
			emitter.emit(queue + requestId, result);
		});
	},

	getRequestId(queue) {
		if (!this.requestIds[queue]) {
			this.requestIds[queue] = 1;
		}
		else {
			this.requestIds[queue] ++;
		}
		return this.requestIds[queue];
	},

	async call(queue, ...args) {
		const {host} = this;
		const requestId = this.getRequestId(queue);

		if (!this.transfers[queue]) {
			this.transfers[queue] = 1;
			await this.createTransfer(queue);
		}

		try {
			const channel = await connect.do(host, queue, {durable: true});
			channel.sendToQueue(queue, Buffer.from(requestId + '#' + JSON.stringify(args)), {persistent: true});

			return new Promise(async resolve => {
				emitter.once(queue + requestId, (result) => {
					resolve(result);
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
			// Set options.isReCreate as true to remove queue created before
			const channel = await connect.do(host, queue, {durable: true, isReCreate: true});

			// Delete the queue for result created before
			channel.deleteQueue(queue + '_result');

			channel.consume(queue, async (msg) => {

				// When there are multiple listens processing the same queue,
				// only one listen will receive msg, and other listens will receive msg empty.
				if (!msg) return;

				let message = msg.content.toString();
				channel.ack(msg);

				let requestId;
				([requestId, message] = tools.parseMessage(message));

				const args = JSON.parse(message);
				const result = await handler(...args);

				const resultStr = tools.toJsonStr(result);
				channel.sendToQueue(queue + '_result', Buffer.from(requestId + '#' + resultStr), {persistent: true});
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

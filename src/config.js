
const me = {
	host: 'localhost',
	queue: 'default',

	options: {
		// When RabbitMQ restarts, these messages are saved to disk.
		persistent: true //
	},

	waitTime: 10 * 1000,
};

module.exports = me;

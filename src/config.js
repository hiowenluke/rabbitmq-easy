
const me = {
	host: 'localhost',
	queue: 'default',

	options: {
		// When RabbitMQ restarts, these messages are saved to disk.
		persistent: true //
	},
};

module.exports = me;

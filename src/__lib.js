
const me = {
	create(obj, queue, host, options) {

		// create()
		if (!queue) {
			// do nothing
		}
		else

		// create({queue, host, options})
		if (typeof queue === 'object') {
			({queue, host, options} = queue);
		}
		else {
			// create(queue, options)
			if (typeof host === 'object') {
				options = host;
				host = null;
			}
			else {
				// create(queue, host, ...)
				// do nothing
			}
		}

		const inst = Object.create(obj);
		inst.init && inst.init(queue, host, options);
		return inst;
	}
};

module.exports = me;

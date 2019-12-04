
const expect = require('chai').expect;
const wait = require('../../__lib/wait');
const exec = require('../../__lib/exec');

describe('RPC - options.host', () => {

	before(async () => {
		exec('server.js');
		await wait(100);
	});

	it('', async () => {
		const RPC = require('../../../src').RPC;
		const rpc = RPC({rabbitMQ: {host: '127.0.0.1'}});

		const result = await rpc.call('rpc_test_options.host', 'my host');
		expect(result === 'my host').to.be.true;
	});

});

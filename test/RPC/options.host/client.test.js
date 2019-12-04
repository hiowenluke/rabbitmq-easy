
const expect = require('chai').expect;
const wait = require('../../__lib/wait');
const exec = require('../../__lib/exec');

describe('RPC', () => {

	before(async () => {
		exec('server.js');
		await wait(100);
	});

	it('options.host', async () => {
		const RPC = require('../../../src').RPC;
		const rpc = RPC({host: '127.0.0.1'});

		const result = await rpc.call('rpc_test_options.host', 'my host');
		expect(result === 'my host').to.be.true;
	});

});

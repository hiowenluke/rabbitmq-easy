
const expect = require('chai').expect;
const wait = require('../../__lib/wait');
const exec = require('../../__lib/exec');

describe('RPC - return undefined', () => {

	before(async () => {
		exec('server.js');
		await wait(100);
	});

	it('', async () => {
		const RPC = require('../../../src').RPC;
		const rpc = RPC();

		const result = await rpc.call('rpc_test_return_undefined', 'hello', 'world');
		expect(result === undefined).to.be.true;
	});

});

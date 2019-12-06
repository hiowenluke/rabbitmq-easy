
const expect = require('chai').expect;
const wait = require('../../__lib/wait');
const exec = require('../../__lib/exec');

describe('RPC - multi client instances', () => {

	before(async () => {
		exec('server.js');
		await wait(100);

		exec('client.js');
		await wait(100);
	});

	it('', async () => {
		const RPC = require('../../../src').RPC;
		const rpc = RPC();

		const result = await rpc.call('rpc_test_multi_client_instances', 'hello', 'world');
		expect(result === 'hello world').to.be.true;
	});

});

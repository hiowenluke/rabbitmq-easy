
const expect = require('chai').expect;
const wait = require('../__lib/wait');
const exec = require('../__lib/exec');

const MQ = require('../../src');
const queue = 'test_basic_queue';
const mq = MQ(queue);

describe('basic', () => {

	before(async () => {
		setTimeout(() => {
			exec('send.js');
		}, 200);
	});

	it('', async () => {
		const test = async () => {
			return new Promise(async resolve => {
				await mq.receive(async (message) => {
					resolve(message === 'hello world');
				});
			})
		};
		const result = await test();
		expect(result).to.be.true;
	});

});

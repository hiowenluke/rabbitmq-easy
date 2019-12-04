
const expect = require('chai').expect;
const wait = require('../../__lib/wait');
const exec = require('../../__lib/exec');

const MQ = require('../../../src').MQ;
const mq = MQ();

describe('MQ - multi queues', () => {

	before(async () => {
		setTimeout(() => {
			exec('send.js');
		}, 200);
	});

	it('', async () => {
		const p1 = new Promise(async resolve => {
			await mq.receive('qx1', async (message) => {
				resolve(message === 'hi qx1');
			});
		});

		const p2 = new Promise(async resolve => {
			await mq.receive('qx2', async (message) => {
				resolve(message === 'hi qx2');
			});
		});

		const test = async () => {
			return new Promise(resolve => {
				Promise.all([p1, p2]).then(values => {
					resolve(values[0] && values[1]);
				})
			});
		};

		const result = await test();
		expect(result).to.be.true;
	});

});

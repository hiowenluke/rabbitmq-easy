
const exec = require('child_process').exec;
const caller = require('caller');

const path = require('path');

const fn = (fileName) => {
	const pathToCaller = caller();
	const filePath = path.resolve(pathToCaller, '../' + fileName);
	exec(`node ${filePath}`);
};

module.exports = fn;

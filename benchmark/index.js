
const be = require('beasy')();
const fn = require('./send');

be.before('./receive');
be.start(fn, 10000);

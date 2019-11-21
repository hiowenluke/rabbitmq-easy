
# RabbitMQ Easy

An easy to use RabbitMQ library for [Node.js](https://nodejs.org), support MQ and RPC (simpler then gRPC, consul, etc.).


## Install

```bash
npm install rabbitmq-easy --save
```

## Quick Start

### Install RabbitMQ With Docker

Please "[Install Docker](https://docs.docker.com/v17.09/engine/installation/#supported-platforms)" first (**Docker CE** recommended). Then do the following.

```bash
## Install RabbitMQ 
docker pull rabbitmq:management

## Start RabbitMQ
docker run -d -p 5672:5672 -p 15672:15672 --name rabbitmq rabbitmq:management
```

Login to Management of RabbitMQ:
1. Visit `http://localhost:15672/` in your browser.
2. Username/password: `guest/guest`.


### Use as MQ

**receive.js**

```js
const MQ = require('rabbitmq-easy').MQ;
const queue = 'q1'; // Name queue as "q1"
const mq = MQ(queue); // Create a message queue

// Handle the message comes from queue "q1"
const handler = async (message) => {
    console.log(message);
};

const main = async () => {
    // Receive messages comes from queue "q1" in RabbitMQ
    await mq.receive(handler);
};

main();
```

**send.js**

```js
const MQ = require('rabbitmq-easy').MQ;
const queue = 'q1'; // Name queue as "q1"
const mq = MQ(queue); // Create a message queue

const main = async () => {
    // Send a message to queue "q1" in RabbitMQ
    await mq.send('hello world');
};

main();
```

### Use as RPC

**server.js**

```js
const RPC = require('rabbitmq-easy').RPC;
const rpc = RPC();

const handler = async (a1, a2) => {
	console.log(a1, a2); // hello world
	return {a: 1};
};

const main = async () => {
	
	// If the "testFunc" is requested, then let handler to process it
	await rpc.listen('testFunc', handler);
};

main();
```

**client.js**

```js
const RPC = require('rabbitmq-easy').RPC;
const rpc = RPC();

const main = async () => {
	
	// The "testFunc" is function name, the others are arguments passed to function "testFunc"
	const result = await rpc.call('testFunc', 'hello', 'world');
	console.log(result); // {a: 1}
};

main();
```

## License

[MIT](LICENSE)

Copyright (c) 2019, Owen Luke

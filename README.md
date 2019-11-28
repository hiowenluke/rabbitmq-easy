
# RabbitMQ-Easy

An easy-to-use RabbitMQ library for [Node.js](https://nodejs.org), support MQ and RPC. RabbitMQ-Easy RPC is simpler then gRPC, consul, etc.

## Install RabbitMQ 

Deploy RabbitMQ to a docker container:

1. [Install Docker](https://docs.docker.com/v17.09/engine/installation/#supported-platforms) (Docker CE recommended)
2. Install RabbitMQ: `docker pull rabbitmq:management`
3. Start RabbitMQ: `docker run -d -p 5672:5672 -p 15672:15672 --name rabbitmq rabbitmq:management`
4. Login to RabbitMQ management web page: `http://localhost:15672/` (guest/guest)


## Install RabbitMQ-Easy

```bash
npm install rabbitmq-easy --save
```

## MQ

### 1. Basic

**receive.js**

```js
const MQ = require('rabbitmq-easy').MQ;
const queue = 'q1'; // Name queue as "q1"

// The options.host is RabbitMQ host
// It can be omitted if it is "localhost"
const mq = MQ(queue, {host: 'localhost'}); // Create a message queue

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

// The options must be as same as it in receive.js
const mq = MQ(queue, {host: 'localhost'}); // Create a message queue

const main = async () => {
    // Send a message to queue "q1" in RabbitMQ
    await mq.send('hello world');
};

main();
```

### 2. Default Queue

**receive.js**

```js
const mq = require('rabbitmq-easy').MQ();

const handler = async (message) => {
    console.log(message);
};

const main = async () => {
    await mq.receive(handler);
};

main();
```

**send.js**

```js
const mq = require('rabbitmq-easy').MQ();

const main = async () => {
    await mq.send('hello world');
};

main();
```

### 3. Multiple Queues

**receive.js**

```js
const mq = require('rabbitmq-easy').MQ();

const handler1 = async (message) => {
    console.log('[1]', message);
};

const handler2 = async (message) => {
    console.log('[2]', message);
};

const main = async () => {
    await mq.receive('qx1', handler1);
    await mq.receive('qx2', handler2);
};

main();
```

**send.js**

```js
const mq = require('rabbitmq-easy').MQ();

const main = async () => {
    await mq.send('qx1', 'hi qx1');
    await mq.send('qx2', 'hi qx2');
};

main();
```

## RPC

**testFunc.js**

```js
// The options.host is RabbitMQ host
// It can be omitted if it is "localhost"
const rpc = require('rabbitmq-easy').RPC({host: 'localhost'});

const handler = async (index) => {
    return index;
};

const main = async () => {
    
    // The testFunc is function name
    await rpc.listen('testFunc', handler);
};

main();
```

**call-testFunc.js**

```js
// The options must be as same as it in testFunc.js
const rpc = require('rabbitmq-easy').RPC({host: 'localhost'});

const main = async () => {    

    // The called function name must be match with in testFunc.js
    const result = await rpc.call('testFunc', 'hello', 'world');
    console.log(result); // {a: 1}
};

main();
```

## Examples

See [examples](./examples) to learn more.

## License

[MIT](LICENSE)

Copyright (c) 2019, Owen Luke

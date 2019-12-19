
# RabbitMQ-Easy

An easy-to-use RabbitMQ library for [Node.js](https://nodejs.org), based on [AMQP.node](https://github.com/squaremo/amqp.node) (amqplib). RabbitMQ is a high-performance MQ.

## Server Environment

1. [Install Docker](https://docs.docker.com/v17.09/engine/installation/#supported-platforms) (Docker CE recommended)
2. Install RabbitMQ: `docker pull rabbitmq:management`
3. Start RabbitMQ: `docker run --restart=always --name rabbitmq -d -p 5672:5672 -p 15672:15672 rabbitmq:management`
4. Login to RabbitMQ management web page: `http://localhost:15672/` (guest/guest)

## Installation

```bash
npm install rabbitmq-easy --save
```

## Usage

### 1. Basic

**receive.js**

```js
const MQ = require('rabbitmq-easy');
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
const MQ = require('rabbitmq-easy');
const queue = 'q1'; // Name queue as "q1"
const mq = MQ(queue); // Create a message queue

const main = async () => {
    // Send a message to queue "q1" in RabbitMQ
    await mq.send('hello world');
};

main();
```

### 2. Default Queue

**receive.js**

```js
const mq = require('rabbitmq-easy')();

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
const mq = require('rabbitmq-easy')();

const main = async () => {
    await mq.send('hello world');
};

main();
```

### 3. Multiple Queues

**receive.js**

```js
const mq = require('rabbitmq-easy')();

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
const mq = require('rabbitmq-easy')();

const main = async () => {
    await mq.send('qx1', 'hi qx1');
    await mq.send('qx2', 'hi qx2');
};

main();
```

### 4. Options

```js
const MQ = require('rabbitmq-easy');

// The options can be omitted if options.rabbitMQ.host is 'localhost'
const options = {
    rabbitMQ: {
        host: 'localhost' 
    }
};

const mq = MQ('queueName', options);
...
```

## Examples

See [examples](./examples) to learn more.

## Test

```sh
git clone https://github.com/hiowenluke/rabbitmq-easy.git
cd rabbitmq-easy
npm install
npm test
```

## Performance

Run benchmark
```sh
node ./benchmark/index.js
```

Results
```sh
Running scripts...
Benchmarking [10000] times, [10] runs.
Starting...
Run #1: 0.243 seconds, 41152 times/sec
Run #2: 0.089 seconds, 112359 times/sec
Run #3: 0.098 seconds, 102040 times/sec
Run #4: 0.099 seconds, 101010 times/sec
Run #5: 0.086 seconds, 116279 times/sec
Run #6: 0.085 seconds, 117647 times/sec
Run #7: 0.105 seconds, 95238 times/sec
Run #8: 0.118 seconds, 84745 times/sec
Run #9: 0.092 seconds, 108695 times/sec
Run #10: 0.08 seconds, 125000 times/sec
Done.
Average: 0.11 seconds, 100417 times/sec
----------------------------------------
Platform info:
macOS Mojave 10.14 x64
Intel(R) Core(TM) i7-4558U CPU @ 2.80GHz x 4
Total Memory 16 GB
Node.js v10.16.3
V8 6.8.275.32-node.54
```

## License

[MIT](LICENSE)

Copyright (c) 2019, Owen Luke

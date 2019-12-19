
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

## License

[MIT](LICENSE)

Copyright (c) 2019, Owen Luke

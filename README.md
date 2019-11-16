
# RabbitMQ Easy

An easy to use RabbitMQ library for [Node.js](https://nodejs.org).


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


### Use RabbitMQ

**send.js**

```js
const rabbitMQ = require('rabbitmq-easy');
const queue = 'q1'; // Name queue as "q1"
const mq = rabbitMQ(queue); // Create a message queue

const main = async () => {
    // Send a message to queue "q1" in RabbitMQ
    await mq.send('hello world');
};

main();
```

**receive.js**

```js
const rabbitMQ = require('rabbitmq-easy');
const queue = 'q1'; // Name queue as "q1"
const mq = rabbitMQ(queue); // Create a message queue

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

## License

[MIT](LICENSE)

Copyright (c) 2019, Owen Luke

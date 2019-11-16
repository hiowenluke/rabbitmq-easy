
# RabbitMQ Easy

An easy to use RabbitMQ library for [Node.js](https://nodejs.org).


## Demo

**send.js**

Send messages to RabbitMQ.

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

Receive messages from RabbitMQ.
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

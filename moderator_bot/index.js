#!/usr/bin/env node

const amqp = require('amqplib/callback_api');
const { Client } = require('pg');

const client = new Client({
  user: 'ihelp',
  host: 'localhost',
  database: 'ihelp',
  password: 'ihelp',
  port: '5432',
});

client.connect();

amqp.connect('amqp://localhost:5672', function(error0, connection) {
  if (error0) {
    throw error0;
  }
  connection.createChannel(function(error1, channel) {
    if (error1) {
      throw error1;
    }
    var queue = 'moderator_bot';

    channel.assertQueue(queue, {
      durable: false
    });

    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", queue);

    channel.consume(queue, function(msg) {
      console.log(" [x] Received %s", msg.content.toString());
      // client.query('SELECT...', (err,res) =>{});
    }, { noAck: true });
  });
});

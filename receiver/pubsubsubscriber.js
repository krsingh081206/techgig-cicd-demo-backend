 wiimport { PubSub } from '@google-cloud/pubsub';
import LoggerModule, { logger } from '../utils/logger.js';
import config from './../config/config.js';

export default async function subscribeToEchoTopic() {
    // Creates a client
    const pubsub = new PubSub();

    // Subscription name, e.g., 'my-subscription'
    const subscriptionName = config.subscriberName;
    const module = 'receiver.pubsubSubscriber';

    logger.info(LoggerModule.msg(module, `SubscriberName: ${subscriptionName}`));

    // References an existing subscription
    const subscription = pubsub.subscription(subscriptionName);

    // Create an event handler to process messages
    const messageHandler = message => {

        logger.info(LoggerModule.msg(module, `Received message: ${message.id}`));
        logger.info(LoggerModule.msg(module, `Data: ${message.data.toString()}`));

        logger.info(LoggerModule.msg(module, `Simulate Delay of 3 seconds`));  
        await new Promise(resolve => setTimeout(resolve, 3000));
        logger.info(LoggerModule.msg(module, `Promise resolved after 3 secs`));
        // Acknowledge the message
        message.ack();
    };

    // Listen for new messages until timeout is hit
    subscription.on('message', messageHandler);

    // Handle subscription errors
    subscription.on('error', error => {
        logger.error(LoggerModule.msg(module, `Received error: ${error.message}`));
    });

}

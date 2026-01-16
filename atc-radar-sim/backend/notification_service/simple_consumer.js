
const Redis = require('ioredis');

const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
});

const main = async () => {
    const queueName = 'notification_queue';
    console.log(`Waiting for jobs in ${queueName}...`);
    const result = await redis.blpop(queueName, 5); // Wait 5 seconds
    if (result) {
        console.log('Popped item:', result[1]);
    } else {
        console.log('Timed out, no item.');
    }
    redis.disconnect();
};

main();

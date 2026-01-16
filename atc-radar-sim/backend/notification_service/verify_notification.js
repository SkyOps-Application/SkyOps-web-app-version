
const Redis = require('ioredis');

const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
});

const main = async () => {
    const queueName = 'notification_queue';
    const payload = {
        type: 'WELCOME',
        email: 'kelvinbui12345@gmail.com',
        first_name: 'Ev',
        name: 'Ev'
    };

    console.log(`Pushing to ${queueName}:`, payload);
    await redis.rpush(queueName, JSON.stringify(payload));
    console.log('Pushed successfully.');
    redis.disconnect();
};

main();

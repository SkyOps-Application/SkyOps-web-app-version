
const Redis = require('ioredis');

// Log env vars
console.log('Env REDIS_HOST:', process.env.REDIS_HOST);
console.log('Env REDIS_PORT:', process.env.REDIS_PORT);

const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
});

redis.on('connect', () => console.log('Redis connected to ' + redis.options.host + ':' + redis.options.port));
redis.on('error', (err) => console.error('Redis error:', err));

const main = async () => {
    const queueName = 'notification_queue';
    const payload = { type: 'DEBUG', timestamp: new Date().toISOString() };
    
    try {
        const lenBefore = await redis.llen(queueName);
        console.log(`Length before: ${lenBefore}`);
        
        const newLen = await redis.rpush(queueName, JSON.stringify(payload));
        console.log(`Pushed. New length: ${newLen}`);
        
        const items = await redis.lrange(queueName, 0, -1);
        console.log('Items in queue:', items);
        
        // Cleanup
        // await redis.del(queueName);
    } catch (e) {
        console.error('Operation failed:', e);
    }
    
    redis.disconnect();
};

main();

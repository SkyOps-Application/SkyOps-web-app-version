import Redis from 'ioredis';

class RedisService {
    private static instance: RedisService;
    private client: Redis;

    private constructor() {
        this.client = new Redis({
            host: process.env.REDIS_HOST || 'localhost',
            port: parseInt(process.env.REDIS_PORT || '6379'),
        });

        this.client.on('error', (err) => {
            console.error('Redis Client Error:', err);
        });

        this.client.on('connect', () => {
            console.log('Redis Client Connected');
        });
    }

    public static getInstance(): RedisService {
        if (!RedisService.instance) {
            RedisService.instance = new RedisService();
        }
        return RedisService.instance;
    }

    public getClient(): Redis {
        return this.client;
    }

    public async addToQueue(queueName: string, data: any): Promise<void> {
        try {
            await this.client.rpush(queueName, JSON.stringify(data));
            console.log(`Added message to queue ${queueName}`);
        } catch (error) {
            console.error(`Error adding to queue ${queueName}:`, error);
        }
    }
}

export default RedisService.getInstance();

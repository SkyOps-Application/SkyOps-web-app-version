import Redis from 'ioredis';
import dotenv from 'dotenv';


dotenv.config();


const redisUrl = process.env.REDIS_URL;

let connection;

if (redisUrl) {
  connection = new Redis(redisUrl, {
    tls: redisUrl.startsWith('rediss://') ? { rejectUnauthorized: false } : undefined
  });
} else {
  connection = new Redis({
    host: process.env.REDIS_HOST || 'localhost',
    port: parseInt(process.env.REDIS_PORT || '6379'),
  });
}
export default connection;
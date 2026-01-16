import Redis from 'ioredis';
import dotenv from 'dotenv';


dotenv.config();


const connection = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
});
export default connection;
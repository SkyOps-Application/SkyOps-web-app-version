import redis from './config/redis';
import { sendEmail } from './services/email.service';


const QUEUE_NAME = 'notification_queue';
async function processQueue() {
  console.log(`Waiting for jobs in ${QUEUE_NAME}...`);
  while (true) {
    try {
      // BLPOP: block till new msg
      // return [key, value] or null
      const result = await redis.blpop(QUEUE_NAME, 0); 
      
      if (result) {
        const message = result[1];
        const data = JSON.parse(message);
        
        console.log('Processing job:', data);
        if (data.type === 'WELCOME') {
          await sendEmail(data.email, 'Welcome!', 'Welcome to SkyOps!');
        }
      }
    } catch (error) {
      console.error('Error processing queue:', error);
    }
  }
}
processQueue();
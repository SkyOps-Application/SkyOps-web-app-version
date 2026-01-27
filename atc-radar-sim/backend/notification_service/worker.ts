import redis from './config/redis';
import { sendEmail } from './services/email.service';

import { render } from '@react-email/render';
import { WelcomeEmail } from './templates/welcome';
import { ResetPasswordEmail } from './templates/reset_password';


import http from 'http';

const QUEUE_NAME = 'notification_queue';

// Simple HTTP server for Render health checks
const PORT = process.env.PORT || 3000;
const server = http.createServer((req, res) => {
  res.writeHead(200);
  res.end('Notification Service is running correctly');
});

server.listen(PORT, () => {
  console.log(`Notification Service listening on port ${PORT}`);
});

async function processQueue() {
  console.log(`Waiting for jobs in ${QUEUE_NAME}...`);
  while (true) {
    try {
      const result = await redis.blpop(QUEUE_NAME, 0);

      if (result) {
        const message = result[1];
        const data = JSON.parse(message);

        console.log('Processing job:', data);
        if (data.type === 'WELCOME') {
          const emailHtml = await render(WelcomeEmail({ first_name: data.first_name || 'Pilot' }));
          await sendEmail(data.email, 'Welcome to SkyOps!', emailHtml);
        } else if (data.type === 'PASSWORD_RESET') {
          const emailHtml = await render(ResetPasswordEmail({
            first_name: data.first_name || 'Pilot'
          }));
          await sendEmail(data.email, 'Reset your SkyOps Password', emailHtml);
        }
      }
    } catch (error) {
      console.error('Error processing queue:', error);
    }
  }
}

// Start processing in background
processQueue().catch(console.error);
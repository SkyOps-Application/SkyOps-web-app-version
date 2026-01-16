import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import path from 'path';

// Force load env from current working directory (backend/)
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

console.log('SMTP Config:', {
  host: process.env.SMTP_HOST,
  user: process.env.SMTP_USER,
  from: process.env.SMTP_FROM
});

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    const from = process.env.SMTP_FROM || process.env.SMTP_USER || 'noreply@skyops.com';
    const info = await transporter.sendMail({
      from,
      to,
      subject,
      html,
    });
    console.log(`[EMAIL SENT] Message ID: ${info.messageId} | From: ${from} | To: ${to}`);
    return true;
  } catch (error) {
    console.error('[EMAIL ERROR]', error);
    return false;
  }
};
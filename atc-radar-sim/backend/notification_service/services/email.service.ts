import nodemailer from 'nodemailer';
export const sendEmail = async (to: string, subject: string, html: string) => {

    // test
  console.log(`[MOCK EMAIL] To: ${to} | Subject: ${subject}`);
  console.log(`Content: ${html}`);
  return true;
};
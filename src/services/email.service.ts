import nodemailer from 'nodemailer';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.MAIL,
    pass: process.env.PASSWORD
  }
});

const createMailConfig = (to: string, subject: string, html: string) => {
  return {
    from: process.env.MAIL,
    to,
    subject,
    html
  };
};

async function sendRegistrationVerificationMail(email: string, id: number) {
  const token = jwt.sign({ id }, process.env.SECRETKEY, {
    expiresIn: '300s'
  });

  const html = `<h1>Click the button to verify your account.</h1>
        <a style="text-decoration: none; background: gray; color: white; padding: 6px 12px; border-radius: 4px" href="http://localhost:${process.env.PORT}/api/users/verify?token=${token}"
        target="_blank">Verify</a>`;

  const mailOptions = createMailConfig(email, 'Registration Confirmation', html);

  try {
    return await transporter.sendMail(mailOptions);
  } catch (error) {
    throw new Error(`Failed to send registration confirmation email::${error}`);
  }
}
async function sendFailedPaymentMail(message: string, email: string) {
  try {
    const html = `<h3>
            ${message}
        </h3>`;

    const mailOptions = {
      from: process.env.MAIL,
      to: email,
      subject: 'Payment failed',
      html
    };

    return await transporter.sendMail(mailOptions);
  } catch (e) {
    throw new Error(e);
  }
}

async function sendReceiptOrderMail(email: string, url: string) {
  try {
    console.log(email, url);
    const html = `<div style="">You successfully complete payment please follow this link to get your payment receipt <a href="${url}">Reciept</a></div>`;
    const mailOptions = {
      from: process.env.MAIL,
      to: email,
      subject: 'Payment fulfilled',
      html
    };
    return await transporter.sendMail(mailOptions);
  } catch (e) {
    throw new Error(e);
  }
}

export default {
  sendRegistrationVerificationMail,
  sendReceiptOrderMail,
  sendFailedPaymentMail
};

import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";

const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.MAIL,
        pass: process.env.PASSWORD
    }
});

async function sendRegistrationVerificationMail(email: string){
    const token = jwt.sign({ email }, process.env.SECRETKEY, { expiresIn: '1800s' });

    const html = `<h1>Click the button to verify your account.</h1>
    <a style="text-decoration: none; background: gray; color: white; padding: 6px 12px; border-radius: 4px" href="http://localhost:${process.env.PORT}/api/verify?token=${token}"
     target="_blank">Verify</a>`;
    const mailOptions = {
        from: process.env.MAIL,
        to: email,
        subject: 'Registration Confirmation',
        html: html
    }

    try {
        return await transporter.sendMail(mailOptions);
    } catch (error) {
        throw new Error(`Failed to send registration confirmation email::${error}`);
    }
}

export default sendRegistrationVerificationMail;
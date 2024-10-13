import nodemailer, { TransportOptions } from 'nodemailer';
import 'dotenv/config';

const mailService = {
    async sendEmail( emailTo: string, emailSubject: string, emailText: string ): Promise<void>{
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST || '',
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER|| '',
          pass: process.env.SMTP_PASS|| '',
        },
      });
      await transporter.sendMail( {
        from:process.env.SMTP_USER || '' ,
        to: emailTo,
        subject: emailSubject,
        text: emailText,
      });
    },
  };
  
  Object.freeze(mailService);

export default mailService;
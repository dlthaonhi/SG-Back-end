import nodemailer from 'nodemailer';
interface emailOptions {
    emailFrom: string;
    emailTo: string;
    emailSubject: string;
    emailText: string;
}

const mailService = {
    async sendEmail(options: emailOptions): Promise<void> {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
        });

        try {    
            await transporter.sendMail({
                from: options.emailFrom,
                to: options.emailTo,
                subject: options.emailSubject,
                text: options.emailText,
            })
        } catch (error) {
            console.error('Error sending email:', error);
            throw new Error('Failed to send email');
        }
    }
}

export default mailService;
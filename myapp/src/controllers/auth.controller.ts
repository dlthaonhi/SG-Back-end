import authServices from "../services/auth.services";
import { Request, Response } from 'express';
import connectDB from "../database/connection"
import crypto from 'crypto';
import mailService from "../services/mail.services";
import bcrypt from "bcryptjs"

const USERNAME_REGEX = /^[a-zA-Z0-9_-]+$/;

interface AuthenticatedRequest extends Request {
    user?: {
        username: string;
        user_id: number;
    };
}

const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

const validatePassword = (password: string) : boolean => {
    return password.length >= 6;
}

const register = async (req: Request, res: Response): Promise<void> => {
    const { username, password, email } = req.body;

    if (!email || !username || !password) {
        res.status(400).json({ message: 'All fields are required.' });
        return;
    }

    if (!validateEmail(email)) {
        res.status(400).json({ message: 'Email is invalid.' });
        return;
    }

    if (!validatePassword(password)) {
        res.status(400).json({ message: 'Password must be at least 6 characters' });
        return;
    }

    if (!USERNAME_REGEX.test(username)) {
        res.status(400).json({ message: 'Username must contain only letters, numbers, underscores, and dashes' });
        return;
    }

    try {
        const result = await authServices.register(username, password, email);
        res.status(201).json(result);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

const login = async (req: Request, res: Response): Promise<void> => {
    const {username, password} = req.body;

    if (!username || !password) {
        res.status(400).json({ message: 'All fields are required' });
        return;
    }

    try {
        const result = await authServices.login(username, password);
        res.status(200).json(result);
    } catch (error: any) {
        res.status(400).json({ error: error.message });
    }
}

const getMe = async (req: AuthenticatedRequest, res: Response): Promise<void> => {
    const user = req.user;
    if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
    }
    res.status(200).json({ user });
}

const forgotPassword =  async (req: Request, res: Response): Promise<void> => {
    const {email} = req.body;

    if (!email) {
        res.status(400).json({ message: 'Email is required' });
        return;
    }

    if (!validateEmail(email)) {
        res.status(400).json({ message: 'Email is invalid' });
        return;
    }

    const db = await connectDB();
    if (!db) {
        throw new Error('Database connection failed');
    }

    try {
        const [user]: any[] = await db.execute('SELECT  * FROM users WHERE email = ?', [email]);

        if (user.length === 0) {
            res.status(400).json({ message: 'Email not found' });
            return;
        }

        const otp = crypto.randomInt(100000, 999999).toString();
        const expiration = new Date(Date.now() + 10 * 60 * 1000);

        await db.execute('UPDATE users SET passwordResetToken = ?, passwordResetExpiration  = ? WHERE email = ?', [otp, expiration, email]);

        const emailFrom = process.env.SMTP_USER;
        if (!emailFrom) {
            res.status(500).json({ error: 'SMTP_USER is not defined' });
            return;
        }

        await mailService.sendEmail({
            emailFrom: emailFrom,
            emailTo: email,
            emailSubject: 'Password Reset',
            emailText: `Your password reset OTP is: ${otp}`
        })

        res.status(200).json({ message: 'Reset password email sent successfully' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

const resetPassword = async (req: Request, res: Response): Promise<void> => {
    const { email, passwordResetToken, newPassword } = req.body;

    if (!email || !passwordResetToken || !newPassword) {
        res.status(400).json({ message: 'All fields are required' });
        return;
    }

    if (!validateEmail(email)) {
        res.status(400).json({ message: 'Email is invalid' });
        return;
    }

    if (!validatePassword(newPassword)) {
        res.status(400).json({ message: 'New password must be at least 6 characters long' });
        return;
    }

    const db = await connectDB();
    if (!db) {
        throw new Error('Database connection failed');
    }

    try {
        const [user] : any[] = await db.execute('SELECT * FROM users WHERE email = ? AND passwordResetToken = ?', [email, passwordResetToken]);

        if (user.length === 0 || (user.length > 0 && user[0].passwordResetExpiration < new Date())) {
            res.status(400).json({ message: 'Invalid or expired token' });
            return;
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await db.execute('UPDATE users SET password = ?, passwordResetToken = NULL, passwordResetExpiration = NULL WHERE email = ?', [hashedPassword, email]);

        res.status(200).json({ message: 'Password reset successfully' });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}
export default { register, login, getMe, forgotPassword, resetPassword };
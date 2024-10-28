import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import connectDB from "../database/connection"
import { RowDataPacket } from 'mysql2';

interface User extends RowDataPacket{
    user_id: number;
    username: string;
    password: string;
    email: string;
}

const isUserExist  = async (userName: string, email: string): Promise<boolean> => {
    const db = await connectDB();
    if (!db) {
        throw new Error('Database connection failed');
    }

    const query = 'SELECT * FROM users WHERE username = ? OR email = ?'
    const [rows] = await db.execute<User[]>(query, [userName, email]);

    return rows.length > 0;
}

const register = async (userName: string, password: string, email: string) : Promise<{ message: string}> => {
    const userExist = await isUserExist(userName, email);
    if (userExist) {
        throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    const db = await connectDB();
    if (!db) {
        throw new Error('Database connection failed');
    }

    await db.execute(query, [userName, email, hashedPassword]);

    return { message: 'User registered successfully' };
}

const login = async (userName: string, password: string) : Promise<{ message: string, token: string}> => {
    const query = 'SELECT * FROM users WHERE username = ?';
    const db = await connectDB();
    if (!db) {
        throw new Error('Database connection failed');
    }

    const [rows] = await db.execute<User[]>(query, [userName]);

    if (rows.length === 0) {
        throw new Error('User not found');
    }

    const user = rows[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Incorrect password');
    }

    const token = jwt.sign(
        { username: userName, user_id: user.user_id},
        process.env.ACCESS_TOKEN_SECRET as string,
        { expiresIn: '1h'}
    );

    return { message: 'Logged in successfully', token};
}

export default { register, login };
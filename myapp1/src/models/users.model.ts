import { PoolConnection,RowDataPacket, FieldPacket } from 'mysql2/promise';
import pool from "../databases/database.connection.js";

interface IUser {
    ID: number;
    username: string;
    password: string;
    gender: boolean;
    age: number;
    email: string;
    salt?: string;
    tokenReset?: string | null;
    passwordResetExpiration?: Date | null;
    passwordLastResetDate?: Date | null;
}
type IUserRegister = Omit<IUser, 'ID'>;

interface IUserRow extends IUser, RowDataPacket {}

class UserModel {
    async createUser(user: IUserRegister) {
        let connection: PoolConnection | null = await pool.getConnection();         
        try {
            const insertQuery = `
            INSERT INTO users (username, email, password, gender, age, salt)
            VALUES (?, ?, ?, ?, ?,?)
            `;
            console.log("vao day" , user);
            const { username, email, password, gender, age, salt} = user; 
            const values = [user.username, user.email, user.password, user.gender, user.age, user.salt];
            await connection.query(insertQuery, values);
            
            return { 
                success: true, 
                message: 'User created successfully', 
                data: user 
            };
        } catch (error) {
            console.error("Error creating user:", error);
            throw error;
        }   
        finally {
            if (connection)
                connection.release();
        } 

    }

    async getUserByUsername(username: string) : Promise <IUser | null>{
        let connection: PoolConnection | null = await pool.getConnection();
        try{
            const query = `SELECT * FROM users WHERE username = ?`; 
            const value = [username];
            const [rows, fields]: [IUserRow[], FieldPacket[]] = await connection.query(query, value);
            return rows[0] || null;
        } 
        catch(error){
            throw error;
        } 
        finally {
            if(connection)
                connection.release();
        }
    }

    async getUserByID(userId: number) {
        let connection: PoolConnection | null = await pool.getConnection();
        try{
            const query = `SELECT * FROM users WHERE ID = ?`; 
            const value = [userId];
            const [rows,fields]:[IUserRow[], FieldPacket[]] = await connection.query(query, value);
            return rows[0];
        }
        catch(error){
            throw error;
        }
        finally {
            if(connection)
                connection.release();
        }
    }

    async getUserByEmail(email: string){
        let connection: PoolConnection | null = await pool.getConnection();
        try{
            const query = `SELECT * FROM users WHERE email = ?`; 
            const value = [email];
            const [rows,fields]:[IUserRow[], FieldPacket[]]  = await connection.query(query, value);
            return rows[0];
        } catch(error){
            throw error;
        } finally {
            if(connection)
                connection.release();
        }
    }

    async updateUser(userId: number, user: IUser){
        let connection: PoolConnection | null = await pool.getConnection();
        try{
            const query = `UPDATE users SET username = ?, email = ?, password = ?, gender = ?, age = ?, salt = ?, tokenReset = ?, passwordResetExpiration = ?, passwordLastResetDate = ? WHERE ID = ?`; 
            const {username, email, password, gender, age, salt, tokenReset, passwordResetExpiration, passwordLastResetDate} = user;
            const value = [username, email, password, gender, age, salt, tokenReset,passwordResetExpiration, passwordLastResetDate, userId];
            console.log("Updated:", user);
            await connection.query(query, value);
            return { 
                success: true, 
                message: 'User created successfully' 
            };
        } catch(error){
            throw error;
        } finally {
            if(connection)
                connection.release();
        }
    }

    async getUserResetPassword (email: string, tokenReset: string, passwordResetExpiration: Date) {
        let connection: PoolConnection | null = await pool.getConnection();
        try{
            const query = `SELECT * FROM users WHERE email = ? AND tokenReset = ? AND passwordResetExpiration >= ? `; 
            const value = [email, tokenReset, passwordResetExpiration];
            const [rows,fields]:[IUserRow[], FieldPacket[]]  = await connection.query(query, value);
            // console.log(`rows: ${rows}`);
            return rows[0];
        } catch(error){
            throw error;
        } finally {
            if(connection)
                connection.release();
        }
    }
}

export default new UserModel();
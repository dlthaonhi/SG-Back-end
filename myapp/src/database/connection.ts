import dotenv from 'dotenv'
import mysql, { Connection } from 'mysql2/promise';

dotenv.config()

interface DBConnectionConfig {
    host: string | undefined;
    user: string | undefined;
    password: string | undefined;
    database: string | undefined;
}

const dbConfig : DBConnectionConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
}

const connectDB = async (): Promise<Connection | null> => {
    try {
        const db: Connection = await mysql.createConnection(dbConfig)
        console.log("Database connected successfully");
        return db;
    } catch (error) {
        console.error("Error connecting to database", error);
        return null;
    }
}

export default connectDB ;
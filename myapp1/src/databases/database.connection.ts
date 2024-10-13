import mysql from 'mysql2/promise'

// Create the connection to database
const dbConfig= ({
    host: "127.0.0.1",
    user: 'root',
    port: 3306,
    database: 'database01'
    // password: 'thaonhi'
});

const pool =  mysql.createPool(dbConfig);

export default pool;
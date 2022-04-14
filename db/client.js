// Connect to DB
const { Client } = require('pg');
const DB_URL = process.env.DATABASE_URL || `postgres://localhost:5432/${ process.env.DB_NAME }`;
// const client = new Client(DB_URL) for local host

const client = new Client({
    connectionString: process.env.DATABASE_URL,
        ssl: {
            rejectUnauthorized: false,
            
        }
});

module.exports = client;
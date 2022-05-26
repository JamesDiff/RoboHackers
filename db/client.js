// Connect to DB
const dotenv = require('dotenv')

dotenv.config()

const { Client } = require('pg');
const DB_URL = process.env.DATABASE_URL || `postgres://localhost:5432/${process.env.DB_NAME}`;
// const client = new Client(DB_URL) for local host
console.log("PROCESS ENV.DB_NAME ", process.env.DB_NAME)

let client;

if (process.env.DATABASE_URL) {
    client = new Client({
        connectionString: DB_URL,
        ssl: {
            rejectUnauthorized: false,
        }
    });
} else {
    client = new Client({
        connectionString: DB_URL,
    })
}

// const client = new Client({
//     connectionString: DB_URL,
//         ssl: {

//             rejectUnauthorized: true,

//         }
// });

module.exports = client;
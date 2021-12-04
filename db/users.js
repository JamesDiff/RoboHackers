const client = require('./client');
const bcrypt = require('bcrypt');

async function createUser({ firstname, lastname, password, email, street, city, state, zip, phone }) {
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const {rows: [user]} = await client.query(`
            INSERT INTO users(firstname, lastname, password, email, street, city, state, zip, phone)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
            ON CONFLICT (email) DO NOTHING
            RETURNING *;
        `, [firstname, lastname, hashedPassword, email, street, city, state, zip, phone]);
        if(!user){
            return null;
        }
        delete user.password;
        
        return user;
    } catch (error) {
        console.error("Error creating User", error);
        throw error;
    }
}

async function getUser({ username, password}) {
    const user = await getUserByUsername(username);
    try{
        const passwordEqual = await bcrypt.compare(password, user.password);
        if(passwordEqual){
            delete user.password;
            return user;
        }else{
            return null;
        }
    }catch (error){
        console.error("Error getting User");
        throw error;
    }

}

async function getUserById(id) {
    try {
        const { rows: [ user ] } = await client.query(`
          SELECT *
          FROM users
          WHERE id=${ id };
        `);
    
        if (!user) {
          return null;
        }

        delete user.password;
        return user;
    } catch (error) {
        console.error("Error getting User By ID")
        throw error;
    }
}

async function getUserByUsername(username) {
    try {
        const {rows: [user]} = await client.query(`
            SELECT *
            FROM users
            WHERE username=$1;
        `, [username]);
        if(!user){
            return null;
        }
        return user;
    }catch(error){
        console.error("Error geting User by Username");
        throw error;
    }
}

module.exports = {
    createUser, 
    getUser, 
    getUserById, 
    getUserByUsername
}
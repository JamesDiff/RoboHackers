const client = require('./client');
const bcrypt = require('bcrypt');

async function createUser({ firstname, lastname, password, email, street, city, state, zip, phone, isAdmin }) {
    try {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        if(!isAdmin){
            isAdmin = false;
        }
        const {rows: [user]} = await client.query(`
            INSERT INTO users(firstname, lastname, password, email, street, city, state, zip, phone, is_admin)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
            ON CONFLICT (email) DO NOTHING
            RETURNING *;
        `, [firstname, lastname, hashedPassword, email, street, city, state, zip, phone, isAdmin]);
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

async function getUser({ email, password}) {
    const user = await getUserByEmail(email);
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

async function getUserByEmail(email) {
    try {
        const {rows: [user]} = await client.query(`
            SELECT *
            FROM users
            WHERE email=$1;
        `, [email]);
        if(!user){
            return null;
        }
        return user;
    }catch(error){
        console.error("Error geting User by Email");
        throw error;
    }
}

module.exports = {
    createUser, 
    getUser, 
    getUserById, 
    getUserByEmail
}
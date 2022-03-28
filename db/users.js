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
            INSERT INTO users(firstname, lastname, password, email, street, city, state, zip, phone, is_admin, billingfirstname, billinglastname, billingstreet, billingcity, billingstate, billingzip)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
            ON CONFLICT (email) DO NOTHING
            RETURNING *;
        `, [firstname, lastname, hashedPassword, email, street, city, state, zip, phone, isAdmin, firstname, lastname, street, city, state, zip]);
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
    console.log("GET USER (user), ", user)
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
    console.log("GET USER BY EMAIL, ", email)
    try {
        const {rows: [user]} = await client.query(`
            SELECT *
            FROM users
            WHERE email=$1;
        `, [email]);
        console.log("INSIDE GET USER BY EMAIL (user), ", user)
        if(!user){
            return null;
        }
        return user;
    }catch(error){
        console.error("Error geting User by Email");
        throw error;
    }
}

const getAllUsers = async () => {
    try {
      const { rows } = await client.query(
        `
          SELECT id, firstname, lastname, email, street, city, state, zip, phone, is_admin
          FROM users;
        `
      );
  
      return rows;
    } catch (error) {
      throw error;
    }
  };

  async function deleteUserById(id) {
   
    try {
        const { rows: [user] } = await client.query(`
            DELETE FROM users
            WHERE id = $1
            RETURNING *;
        `, [id]);
    
    return user;
    } catch (error) {
        console.error("Error deleting user");
        throw error;
    }
}


async function updateUser(id, fields = {}) {

    const setString = Object.keys(fields).map(
        (key, index) => `"${ key }"=$${ index + 1 }`
    ).join(', ');

    if (setString.length === 0) {
        return;
    }

    try {
        const {rows : [user]} = await client.query(`
        UPDATE users
        SET ${ setString }
        WHERE id=${ id }
        RETURNING *;
        `, Object.values(fields));

        return user;
    } catch (error) {
        throw error;
    }
}


async function saveActiveOrderId(userId, orderId){
    try {
        const {rows: [user] }  = await client.query(`
            UPDATE users
            SET activeOrderId=$2
            WHERE id=$1
            RETURNING *;
        `, [userId, orderId])
    } catch (error) {
        console.error("Error updating user", error);
        throw error;
    }
}

module.exports = {
    createUser, 
    getUser, 
    getUserById,
    updateUser, 
    getUserByEmail,
    getAllUsers,
    deleteUserById,
    saveActiveOrderId
}
const client = require('./client');

async function createOrder({userId, total_price, order_status}){
    console.log("Create Order", userId, total_price, order_status)
    try {
        const {rows: [order]} = await client.query(`
            INSERT INTO orders("userId", total_price, order_status)
            VALUES ($1, $2, $3)
            RETURNING *;
        `, [userId, total_price, order_status]);
        if(!order){
            return null;
        }
        return order;
    } catch (error) {
        console.error("Error creating Order", error);
        throw error;
    }
}

module.exports = {
    createOrder
}
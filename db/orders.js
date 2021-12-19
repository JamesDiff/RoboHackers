const { getUserById, getUserByEmail } = require('./users');
const client = require('./client');

const { getOrderProductsByOrder } = require("./order_products")

async function createOrder({userId, order_status}){
    console.log("Create Order", userId, order_status)
    try {
        const {rows: [order]} = await client.query(`
            INSERT INTO orders("userId", order_status)
            VALUES ($1, $2)
            RETURNING *;
        `, [userId, order_status]);
        if(!order){
            return null;
        }
        return order;
    } catch (error) {
        console.error("Error creating Order", error);
        throw error;
    }
}

async function getAllOrders() {
    try{
        const {rows : orders} = await client.query(`
            SELECT * 
            FROM orders;
        `);
        await Promise.all(orders.map(async (order) => {
            //go get line items
            order.lineItems = await getOrderProductsByOrder(order.id);
            
            const user = await getUserById(order.userId);
            if(user){
                order.creatorEmail = user.email;
            }        
        }));
        if(orders.length == 0)
        {
            return [];
        }
        return orders;
    }catch(error){
        console.error("Error gettting All Orders", error);
        throw error;
    }
}

async function getOrdersByUserEmail(email){
    try{
        const allOrders = await getAllOrders();
        const user = await getUserByEmail(email);

        const userOrders = allOrders.filter((order) => {
            return user.email === order.creatorEmail;
        })

        return userOrders;
    }catch(error){
        console.error("Error getting All Orders by Email");
    }
}

async function getOrderById(id){
    try{
        const {rows : [order]} = await client.query(`
            SELECT *
            FROM orders
            WHERE id=${ id };
        `); //got rid of array
        if(!order){
            return null;
        };
        const user = await getUserById(order.userId);
        if(user){
            order.user = user;
        }

        const lineItems = await getOrderProductsByOrder(id);
        if(lineItems){
            order.lineItems = lineItems;
        }
        return order;
    }catch (error){
        console.error("Error getting Order by Id", error);
        throw error;
    }
}

async function deleteOrder(id) {
   
    try {
        const { rows: [order] } = await client.query(`
            DELETE FROM orders
            WHERE id = $1
            RETURNING *;
        `, [id]); 
    
    return order;
    } catch (error) {
        console.error("Error deleting order")
        throw error;
    }
}

module.exports = {
    createOrder,
    getAllOrders,
    getOrdersByUserEmail,
    getOrderById,
    deleteOrder
}
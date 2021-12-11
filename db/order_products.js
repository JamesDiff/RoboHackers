const client = require('./client');

async function addProductToOrder(orderId, productId, productPrice, quantity){
    try{
        const {rows : [productToOrder]} = await client.query(`
            INSERT INTO order_products("orderId", "productId", priceAtTimeOfOrder, quantity)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT ("orderId", "productId") DO NOTHING
            RETURNING *;
        `, [orderId, productId, productPrice, quantity]);
        return productToOrder;
    }catch(error){
        console.error("Error adding Product to Order", error);
        throw error;
    }
}

async function getOrderProductsByOrder(orderId){
    try{
        const {rows : lineItems} = await client.query(`
            SELECT products.*, order_products.priceAtTimeOfOrder, order_products.quantity
            FROM products
            JOIN order_products ON products.id=order_products."productId"
            WHERE order_products."orderId"=$1;
        `, [orderId]);
        return lineItems;
    }catch(error){
        console.error("Error getting Orders Line Items", error);
        throw error;
    }
}

module.exports = {
    addProductToOrder,
    getOrderProductsByOrder
}
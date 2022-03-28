const client = require('./client');

async function addProductToOrder(orderId, productId, productPrice, quantity){
    try{
        const {rows : [productExistsInOrder]} = await client.query(
            `SELECT * FROM order_products WHERE "productId"= ${productId} AND "orderId"=${orderId}`
        )
        console.log("PRODUCT FROM ORDER ", productExistsInOrder)
        if(!productExistsInOrder){
            const {rows : [productToOrder]} = await client.query(`
            INSERT INTO order_products("orderId", "productId", priceAtTimeOfOrder, quantity)
            VALUES ($1, $2, $3, $4)
            ON CONFLICT ("orderId", "productId") DO NOTHING
            RETURNING *;
            `, [orderId, productId, productPrice, quantity]);
            return productToOrder;
        }
        let updatedQuantity= productExistsInOrder.quantity + quantity
        console.log("THIS IS THE UPDATED QUANTITY ", updatedQuantity)
        const {rows : [updatedProductOrder]} = await client.query(
            `UPDATE order_products 
            SET quantity=${updatedQuantity}
            WHERE "productId"= ${productId} AND "orderId"=${orderId}`
        )
        console.log("UPDATED QUANTITY ORDER ", updatedProductOrder)
        return "Order updated"
    }catch(error){
        console.error("Error adding Product to Order", error);
        throw error;
    }
}

async function getOrderProductsByOrder(orderId){
    try{
        const {rows : lineItems} = await client.query(`
            SELECT products.*, order_products.id, order_products.priceAtTimeOfOrder, order_products.quantity
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

async function getLineItemById(id){
    try{
        const {rows : lineItem} = await client.query(`
            SELECT * FROM order_products
            WHERE id=$1;
        `, [id]);
        return lineItem;
    }catch(error){
        console.error("Error getting order by product", error);
        throw error;
    }
}

async function deleteLineItem(id){
    try {
        const { rows: [lineItme] } = await client.query(`
            DELETE FROM order_products
            WHERE id = $1
            RETURNING *;
        `, [id]);
    
    return lineItme;
    } catch (error) {
        console.error("Error deleting line item")
        throw error;
    }
}

module.exports = {
    addProductToOrder,
    getOrderProductsByOrder,
    deleteLineItem,
    getLineItemById
}
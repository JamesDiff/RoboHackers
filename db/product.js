const client = require("./client");

async function createProduct(product) {
    try{
        const {rows: [newProduct]} = await client.query(`
            INSERT INTO products(name, description, price, inventory_qty, img_url)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *;   
        `, [product.name, product.description, product.price, product.inventory_qty, product.img_url])
  
        if(!newProduct){
            return null;
        }

        return newProduct;
    }catch(error){
        console.error("Error creating a product");
        throw error;
    }
}

async function getAllProducts() {
    try {
        const { rows : products } = await client.query(`
            SELECT *
            FROM products;
        `);

        return products;
    }catch(error){
        console.error("Error getting all products");
        throw error;
    }
}

async function getProductById(id){
    try {
        const {rows: [product]} = await client.query(`
            SELECT *
            FROM products
            WHERE id=$1;
        `, [id]);

        return product;
    }catch (error){
        console.error("Error getting product with ID ", id)
        throw error;
    }
}

async function updateProduct (id, fields) {
    const setString = Object.keys(fields).map(
        (key, index) => `"${ key }"=$${ index + 1 }`
    ).join(', ');
        
    if (setString.length === 0) {
        return;
    }  

    try {
        const {rows: [product]} = await client.query(`
            UPDATE products
            SET ${ setString }
            WHERE id=${ id }
            RETURNING *;
      ` , Object.values(fields)); 
      
      return product;
    } catch (error) {
        console.error("Error updating product")
        throw error;
    }
}


async function deleteProduct(id) {
   
        try {
            const { rows: [product] } = await client.query(`
                DELETE FROM products
                WHERE id = $1
                RETURNING *;
            `, [id]);
        
        return product;
        } catch (error) {
            console.error("Error deleting product")
            throw error;
        }
    }


module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
}
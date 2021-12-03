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

module.exports = {
    createProduct,
    getAllProducts,
    getProductById
}
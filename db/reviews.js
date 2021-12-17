const client = require('./client');

async function createReviewForProduct({userId, productId, title, description}){
    try{
        console.log("Creating review", userId, productId, title, description)
        const {rows: [review]} = await client.query(`
            INSERT INTO reviews("productId", "userId", title, description)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `, [productId, userId, title, description]);
        if(!review){
            return null;
        }
        return review;
    }catch(error){
        console.error("Error creating review", error)
        throw error;
    }
}

async function getAllReviewsForProduct(productId){
    try{
        const{rows: reviews} = await client.query(`
            SELECT * 
            FROM reviews
            WHERE id=${ productId };
        `)
        return reviews;
    }catch(error){
        console.error("Error getting reviews", error)
        throw error;
    }
}

module.exports = {
    createReviewForProduct,
    getAllReviewsForProduct
}
const client = require('./client');
const {getUserById} = require("./users")

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
        console.log("Getting reviews");
        const{rows: reviews} = await client.query(`
            SELECT reviews.*, users.firstname, users.lastname 
            FROM reviews
            JOIN users ON users.id=reviews."userId"
            WHERE "productId"=${ productId };
        `)
        if(!reviews) {
            return null;
        }
        return reviews;
    }catch(error){
        console.error("Error getting reviews", error)
        throw error;
    }
}

async function addReviewsToProducts(products) {
    try {
      const result = Promise.all(
        products.map(async (product) => {
          const reviews = await getAllReviewsForProduct(product.id);
          return {
            ...product,
            reviews,
          };
        })
      );
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

async function deleteReviewByProduct(productId) {

    try {
        
        const {rows: [review]} = await client.query(`
            DELETE FROM reviews 
            WHERE "productId"=$1
            RETURNING *;
        `, [productId]);

        return (review);
      }

      catch (error) {
        console.error('ERROR removing review from database!!! BE - deleteReviewByProduct');
        throw error;
    }
}

async function deleteReviewByUser(userId) {

    try {
        
        const {rows: [review]} = await client.query(`
            DELETE FROM reviews 
            WHERE "userId"=$1
            RETURNING *;
        `, [userId]);

        return (review);
      }

      catch (error) {
        console.error('ERROR removing review from database!!! BE - deleteReviewByUser');
        throw error;
    }
}

module.exports = {
    createReviewForProduct,
    getAllReviewsForProduct,
    deleteReviewByProduct,
    deleteReviewByUser,
    addReviewsToProducts,
}
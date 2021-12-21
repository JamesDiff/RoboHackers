const express = require('express');
const productsRouter = express.Router();

const { getAllProducts, getProductById, createProduct,  deleteProduct, createReviewForProduct, updateProduct, deleteReviewByProduct } = require('../db');
//{ deleteProduct } 

//get products
productsRouter.get('/', async(req, res, next) => {
    try{
        const products = await getAllProducts();
        console.log("got products")
        res.send(products)

    } catch(error) {
        next(error);
  }
})


//get product
productsRouter.get('/:productId', async(req, res, next) => {
  const productId = req.params.productId;

  try{

    if(!productId){
      throw Error({
        name: 'ProductDoesNotExistError', 
        message: "This product does not exist!"
      });
    }

      const productToGet = await getProductById(productId); 
      res.send(productToGet);
  } catch(error) {
    next(error);
  }
})

// module.exports = productsRouter;


//post products
 productsRouter.post('/', async (req, res, next) => {
   
  const { name, description, price, inventory_qty, img_url } = req.body;
  
  const productToCreate = {  
    name, 
    description, 
    price, 
    inventory_qty, 
    img_url }
  
  try {

    const newProduct = await createProduct(productToCreate);
    res.send(newProduct);
    
    } catch (error) {
      next(error);
    }
      
})

//update/patch
productsRouter.patch ('/:productId', async(req, res, next) => {
   const id = req.params.productId;
  //  const isAdmin = req.user.is_Admin;
  // const user = req.user;

   const {name, description, price, inventory_qty, img_url} = req.body

   const updateFields = {
                          // id, 
                          name, 
                          description, 
                          price, 
                          inventory_qty, 
                          img_url
  };

    try{
        
        
            const updatedProduct = await updateProduct(id, updateFields);
            res.send(updatedProduct)
    }
    
    catch(error) {
      next(error);
    }
}) 


//delete product
productsRouter.delete('/:productId', async (req, res, next) => { 

    const productId = req.params.productId;

    try{

      if (productId) {
        const deletedReview = await deleteReviewByProduct(productId);
        const deletedProduct = await deleteProduct(productId);
        res.send(deletedProduct);
      } else {
        throw new Error("You are not authorized to delete this product")
      }
    } catch(error) {
      next(error);
    }
})

//submit review
productsRouter.post("/:productId/reviews", async (req, res, next) => {
  const productId = req.params.productId;
  try{
    const {description, title} = req.body;
    const newReview = {
      userId:req.user.id, productId:productId, title:title, description:description
    }
    const createdReview = await createReviewForProduct(newReview);
    res.send(createdReview);
  }catch(error){
    console.error("Error creating review", error);
    next(error);
  }
})

module.exports = productsRouter
const express = require('express');
const productsRouter = express.Router();
// const requireUser = require('') //where do I require user from?



const { createProduct, getAllProducts, getProductById, getUser } = require('../db');
//{ updateProduct, deleteProduct } 

//get products
productsRouter.get('/products', async(req, res, next) => {
    try{
        const products = await getAllProducts();
        res.send(products)

    } catch(error) {
        next(error);
  }
})

//get product by id
productsRouter.get('/products/:productId', async(req, res, next) => {
    const productId = req.params.productId;

    try{
        const productToGet = await getProductById(productId); 
        res.send(productToGet);

    } catch(error) {
      next(error);
    }
})


module.exports = productsRouter;


//post products
// productsRouter.post('/products', requireUser, async (req, res, next) => {
//     const creatorId = req.user.id;
//     const { name, description, price, inventory_qty, img_url } = req.body;

//     const productToCreate = { creatorId, name, description, price, inventory_qty, img_url }

//     try {
//       const newProduct = await createProduct(productToCreate);
//       res.send(newProduct);
  
//     } catch (error) {
//       next(error);
//     }
    
//   })

//update/patch
/*productsRouter.patch ('/products/:productId', requireUser, async(req, res, next) => {
   const id = req.params.productId;
   const userId = req.user.id;
   const {name, description, price, inventory_qty, img_url} = req.body

   const updateFields = {id, name, description, price, inventory_qty, img_url};

    try{
        const productToUpdate = await getProductById(id); 

        if (productToUpdate.creatorId === userId) {
            const updatedProduct = await updateProduct(updateFields);
            res.send(updatedProduct)
        } else {
            throw new Error("You are not authorized to update this product")   
        }
    }catch(error) {
      next(error);
    }
}) */


//delete product
/*productsRouter.delete('/products/:productId', requireUser, async (req, res, next) => { 
    const productId = req.params.productId;
    const userId = req.user.id;

    try{
        const productToDelete = await getProductById(productId);
  
      if (productToDelete.creatorId === userId) {
        const deletedProduct = await deleteProduct(productId);
        res.send(deletedProduct);
      } else {
        throw new Error("You are not authorized to delete this product")
      }
    } catch(error) {
      next(error);
    }
})*/
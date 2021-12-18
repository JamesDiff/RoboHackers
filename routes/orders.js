const { urlencoded } = require('express');
const express = require('express');
const ordersRouter = express.Router();

const { createOrder, getOrderById, getProductById, addProductToOrder } = require('../db');


//get order by id
ordersRouter.get('/:orderId', async(req, res, next) => {
    const orderId = req.params.orderId;

    try{

      if(!orderId){
        throw Error({
            name: 'NoOrder', 
            message: "This order doesn't exist"
        });
      }

      const orderToGet = await getOrderById(orderId); 
      res.send(orderToGet);

    } catch(error) {
      next(error);
    }
})


//create order
ordersRouter.post('/', async (req, res, next) => {
    let userId = "";
    if(req.user) userId = req.user.id;
    order_status = "Open" // Default to Open because it's a new order
    const orderToCreate = { userId, order_status}

    try {

      if(!userId){
        throw Error({
            name: 'NotAUser', 
            message: "You must be logged in to place an order"
        });
      }

      const newOrder = await createOrder(orderToCreate);
      console.log("New Order", newOrder)
      res.send(newOrder);
 
    } catch (error) {
      next(error);
    }
   
  })

//addProductToOrder
ordersRouter.post('/:orderId/products/:productId', async(req, res, next) => {
// make a POST to /api/orders/:orderID/products/:productID
    
    try{
        const { quantity } = req.body; 
        const { orderId, productId } = req.params;

        const product = await getProductById(productId);
        productPrice = product.price;
        console.log("Adding Product to Order", orderId, productId, quantity, productPrice)
        if(!orderId){
          throw Error({
              name: 'NoOrder', 
              message: "This order does not exist"
          });
        }

        if(!productId){
          throw Error({
              name: 'NoProduct', 
              message: "This product does not exist"
          });
        }
            
        const newOrderProduct = await addProductToOrder( orderId, productId, productPrice, quantity );
            res.send(newOrderProduct)
        }
            
    catch(error) {
        console.log(error);
        next(error);
    }
})

//update order
ordersRouter.patch ('/orders/:orderId', async(req, res, next) => {
  const orderId = req.params.orderId;
  const userEmail= req.user.email;
  const { total_price, order_status } = req.body

  try{
    const orderToUpdate = await getOrderById(orderId); 

    if (orderToUpdate.creatorId === userEmail) { 
      const updatedProduct = await updateProduct(orderId, total_price, order_status);
      res.send(updatedProduct)
      } else {
        throw new Error("You are not authorized to update this product")   
      }
   } catch(error) {
     next(error);
   }
})

ordersRouter.delete('/:orderId', async (req, res, next) => { 
  const productId = req.params.orderId;
  const isAdmin = req.user.is_Admin;

  try{

    if (isAdmin) {
      const deletedProduct = await deleteProduct(productId);
      res.send(deletedProduct);
    } else {
      throw new Error("You are not authorized to delete this product")
    }
  } catch(error) {
    next(error);
  }
})

module.exports = ordersRouter
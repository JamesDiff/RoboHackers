const { urlencoded } = require('express');
const express = require('express');
const ordersRouter = express.Router();

const { createOrder, getOrderById, getProductById, addProductToOrder } = require('../db');


//get order by id
ordersRouter.get('/:orderId', async(req, res, next) => {
    const orderId = req.params.orderId;

    try{
        const orderToGet = await getOrderById(orderId); 
        res.send(orderToGet);

    } catch(error) {
      next(error);
    }
})


//create order
ordersRouter.post('/', async (req, res, next) => {
    const userId = req.user.id;
    const { total_price, order_status } = req.body;

    const orderToCreate = { userId, total_price, order_status}

    try {
      const newOrder = await createOrder(orderToCreate);
      res.send(newOrder);
 
    } catch (error) {
      next(error);
    }
   
  })

//addProductToOrder
ordersRouter.post('/:orderId/products/:productId', async(req, res, next) => {
// make a POST to /api/orders/:orderID/products/:productID
    
    try{
        const { productPrice, quantity } = req.body; 
        const { orderId, productId } = req.params;
            
        const newOrderProduct = await addProductToOrder({ orderId, productId, productPrice, quantity});
            res.send(newOrderProduct)
        }
            
    catch(error) {
        console.log(error);
        next(error);
    }
})
    

module.exports = ordersRouter